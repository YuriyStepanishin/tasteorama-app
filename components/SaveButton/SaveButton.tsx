'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';

import AuthModal from '@/components/AuthModal/AuthModal';
import { addFavorite, removeFavorite, fetchCurrentUser } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/stores/userStore';

import styles from './SaveButton.module.css';

interface SaveButtonProps {
  recipeId: string;
  initialIsFavorite: boolean;
}

export default function SaveButton({ recipeId, initialIsFavorite }: SaveButtonProps) {
  const [open, setOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const queryClient = useQueryClient();
  const { isAuthenticated, setUser } = useAuthStore();

  const favoriteMutation = useMutation({
    mutationFn: () => (isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)),

    onSuccess: () => {
      setIsFavorite((prev) => !prev);

      queryClient.invalidateQueries({
        queryKey: ['favoriteRecipes'],
      });

      queryClient.invalidateQueries({
        queryKey: ['profileRecipes'],
      });

      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    },

    onError: (error) => {
      if (!isFavorite && isAxiosError(error) && error.response?.status === 409) {
        toast.success('Already in favorites');
        return;
      }

      toast.error(isFavorite ? 'Failed to remove favorite' : 'Failed to add favorite');
    },
  });

  const handleSaveClick = async () => {
    if (favoriteMutation.isPending  isCheckingAuth) {
      return;
    }

    if (isAuthenticated) {
      favoriteMutation.mutate();
      return;
    }

    try {
      setIsCheckingAuth(true);

      const user = await fetchCurrentUser();

      if (user?._id) {
        setUser(user);
        favoriteMutation.mutate();
        return;
      }

      setOpen(true);
    } catch {
      setOpen(true);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={handleSaveClick}
        disabled={favoriteMutation.isPending  isCheckingAuth}
      >
        {favoriteMutation.isPending || isCheckingAuth
          ? 'Saving...'
          : isFavorite
            ? 'Unsave'
            : 'Save'}{' '}
        <Image
          className={styles.icon}
          src={isFavorite ? '/icons/iconFavoriteFilled.svg' : '/icons/iconSave.svg'}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
        />
      </button>

      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
}

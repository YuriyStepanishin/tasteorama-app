'use client';
import { useState } from 'react';
import AuthModal from '@/components/AuthModal/AuthModal';
import { addFavorite, fetchCurrentUser } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';

interface SaveButtonProps {
  recipeId: string;
}

export default function SaveButton({ recipeId }: SaveButtonProps) {
  const [open, setOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const queryClient = useQueryClient();
  const { isAuthenticated, setUser } = useAuthStore();

  const favoriteMutation = useMutation({
    mutationFn: () => addFavorite(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteRecipes'] });
      queryClient.invalidateQueries({ queryKey: ['profileRecipes'] });
      toast.success('Added to favorites');
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 409) {
        queryClient.invalidateQueries({ queryKey: ['favoriteRecipes'] });
        queryClient.invalidateQueries({ queryKey: ['profileRecipes'] });
        toast.success('Already in favorites');
        return;
      }

      toast.error('Failed to add favorite');
    },
  });

  const handleSaveClick = async () => {
    if (favoriteMutation.isPending || isCheckingAuth) {
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
        style={{
          width: '100%',
          height: '40px',
          background: '#9b6c43',
          color: '#fff',
          borderRadius: '6px',
        }}
        onClick={handleSaveClick}
        disabled={favoriteMutation.isPending || isCheckingAuth}
      >
        {favoriteMutation.isPending || isCheckingAuth ? 'Saving...' : 'Save'}
      </button>
      {open && <AuthModal onClose={() => setOpen(false)} />}
    </>
  );
}

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import Loader from '../../components/Loader/Loader';
import { fetchCategories, fetchIngredients, addRecipe } from '../../lib/clientApi';
import toast from 'react-hot-toast';
import { recipeSchema } from '../../validation/recipeSchema';
import styles from './AddRecipeForm.module.css';

import { CategoryProps, IngredientProps, AddRecipePayload } from './interface';

const initialValues = {
  name: '',
  decr: '',
  cookiesTime: '',
  cals: '',
  category: '',
  ingredient: [] as { ingredientId: string; measure: string }[],
  instruction: '',
  recipeImg: null,
};

export default function AddRecipeForm() {
  const {
    data: categories = [],
    isLoading: isCatsLoading,
    isError: isCatsError,
  } = useQuery<CategoryProps[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const {
    data: ingredients = [],
    isLoading: isIngsLoading,
    isError: isIngsError,
  } = useQuery<IngredientProps[]>({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });

  const [newIngredientId, setNewIngredientId] = useState('');
  const [newMeasure, setNewMeasure] = useState('');

  const isPageLoading = isCatsLoading || isIngsLoading;

  return (
    <div className={styles.formContainer}>
      {isPageLoading && <Loader />}

      <h2 className={styles.mainTitle}>Add Recipe</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const payload: AddRecipePayload = {
              title: values.name,
              description: values.decr,
              time: String(values.cookiesTime),
              category: values.category,
              ingredients: values.ingredient.map(item => ({
                ingredient: item.ingredientId,
                ingredientAmount: item.measure,
              })),
              instructions: values.instruction,
            };

            if (values.cals) {
              payload.cals = Number(values.cals);
            }

            await addRecipe(payload);

            toast.success('Recipe published successfully! 🎉');
            resetForm();
          } catch (error) {
            console.error('Failed to publish recipe:', error);
            toast.error('Failed to publish recipe. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className={styles.formContent}>
            <div className={styles.photoUploadSection}>
              <span className={styles.uploadLabelText}>Upload Photo</span>

              <label htmlFor="recipeImg" className={styles.photoUploadLabel}>
                <input
                  id="recipeImg"
                  name="recipeImg"
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    setFieldValue('recipeImg', file);
                  }}
                />

                <div className={styles.photoDropzone}>
                  {!values.recipeImg && (
                    <div className={styles.placeholderContainer}>
                      <svg className={styles.cameraIcon}>
                        <use href="/addPageIcons/sprite.svg#icon-photo" />
                      </svg>
                    </div>
                  )}

                  {values.recipeImg && (
                    <img
                      src={URL.createObjectURL(values.recipeImg as File)}
                      alt="Recipe preview" // TODO: Connect to db
                      className={styles.previewImage}
                    />
                  )}
                </div>
              </label>
              <ErrorMessage name="recipeImg" component="span" className={styles.errorMessage} />
            </div>

            <div className={styles.formDesktopLeft}>
              <div className={styles.generalInfoSection}>
                <h3 className={styles.sectionTitle}>General Information</h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.labelName}>
                    Recipe Title
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter the name of your recipe"
                    className={`${styles.inputField} ${errors.name && touched.name ? styles.inputError : ''}`}
                  />
                  <ErrorMessage name="name" component="span" className={styles.errorMessage} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="decr">Recipe Description</label>
                  <Field
                    name="decr"
                    as="textarea"
                    placeholder="Enter a brief description of your recipe"
                    className={`${styles.textareaField} ${errors.decr && touched.decr ? styles.inputError : ''}`}
                  />
                  <ErrorMessage name="decr" component="span" className={styles.errorMessage} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="cookiesTime">Cooking time in minutes</label>
                  <Field
                    name="cookiesTime"
                    type="number"
                    placeholder="10"
                    className={`${styles.inputField} ${errors.cookiesTime && touched.cookiesTime ? styles.inputError : ''}`}
                  />
                  <ErrorMessage name="cookiesTime" component="span" className={styles.errorMessage} />
                </div>

                <div className={styles.rowInputs}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cals">Calories</label>
                    <Field
                      name="cals"
                      type="number"
                      placeholder="150"
                      className={`${styles.inputField} ${errors.cals && touched.cals ? styles.inputError : ''}`}
                    />
                    <ErrorMessage name="cals" component="span" className={styles.errorMessage} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="category">Category</label>
                    <Field name="category" as="select" className={`${styles.selectField} ${errors.category && touched.category ? styles.inputError : ''}`}>
                      {isCatsError ? (
                        <option>Error loading categories</option>
                      ) : (
                        <>
                          <option value="">Select</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="category" component="span" className={styles.errorMessage} />
                  </div>
                </div>
              </div>

              <div className={styles.ingredientsSection}>
                <h3 className={styles.sectionTitle}>Ingredients</h3>

                <FieldArray name="ingredient">
                  {({ push, remove }) => (
                    <div className={styles.ingredientsList}>
                      <div className={styles.ingredientAddBlock}>
                        <div className={styles.inputGroup}>
                          <label className={styles.inputLabel}>Name</label>
                          <select
                            value={newIngredientId}
                            onChange={(e) => setNewIngredientId(e.target.value)}
                            className={styles.selectField}
                          >
                            {isIngsError ? (
                              <option>Error loading ingredients</option>
                            ) : (
                              <>
                                <option value="">Select ingredient</option>
                                {ingredients.map((ing) => (
                                  <option key={ing._id} value={ing._id}>
                                    {ing.name}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.inputLabel}>Amount</label>
                          <input
                            type="text"
                            value={newMeasure}
                            onChange={(e) => setNewMeasure(e.target.value)}
                            placeholder="100g"
                            className={styles.inputField}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles.addIngredientBtn}
                        onClick={() => {
                          if (newIngredientId && newMeasure) {
                            push({ ingredientId: newIngredientId, measure: newMeasure });
                            setNewIngredientId('');
                            setNewMeasure('');
                          }
                        }}
                      >
                        Add new Ingredient
                      </button>

                      <ErrorMessage name="ingredient" component="span" className={styles.errorMessage} />

                      <div className={`${styles.addedIngredientsContainer} ${values.ingredient.length === 0 ? styles.emptyList : ''}`}>
                        <div className={styles.addedIngredientsHeader}>
                          <span className={styles.headerName}>Name:</span>
                          <span className={styles.headerAmount}>Amount:</span>
                          <span className={styles.headerAction}></span>
                        </div>

                        {values.ingredient.map((item, index) => {
                          const ingName = ingredients.find(i => i._id === item.ingredientId)?.name || 'Unknown';
                          return (
                            <div key={index} className={styles.addedIngredientRow}>
                              <span className={styles.rowName}>{ingName}</span>
                              <span className={styles.rowAmount}>{item.measure}</span>
                              <button
                                type="button"
                                className={styles.removeIngredientBtn}
                                onClick={() => remove(index)}
                              >
                                <svg width="24" height="24" fill="none" stroke="currentColor" aria-hidden="true">
                                  <use href="/addPageIcons/sprite.svg#icon-delete" />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className={styles.instructionsSection}>
                <h3 className={styles.instructionTitle}>Instructions</h3>
                <div className={styles.inputGroup}>
                  <Field
                    name="instruction"
                    as="textarea"
                    placeholder="Enter a text"
                    className={`${styles.instructionField} ${errors.instruction && touched.instruction ? styles.inputError : ''}`}
                  />
                  <ErrorMessage name="instruction" component="span" className={styles.errorMessage} />
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Publish Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
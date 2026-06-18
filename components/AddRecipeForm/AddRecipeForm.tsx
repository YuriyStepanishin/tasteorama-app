import { Formik, Form, Field } from 'formik';
import { recipeSchema } from "@/validation/recipeSchema";

const initialValues = {
  name: '',
  decr: '',
  cookiesTime: '',
  cals: '',
  category: '',
  ingredient: [{ ingredientId: '', measure: '' }, { ingredientId: '', measure: '' }],
  instruction: '',
  recipeImg: null,
};

export default function AddRecipeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={recipeSchema}
      onSubmit={(values) => {
        console.log('Дані форми:', values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Тут буде розмітка ваших інпутів на основі макету Figma */}
        </Form>
      )}
    </Formik>
  );
}
import { Formik, ErrorMessage } from 'formik';
import lowQualityImage from '../../../assets/images/sport-and-fitness-tracker.png';
import highQualityImage from '../../../assets/images/sport-and-fitness-tracker-2x.png';

import {
  SignUpFirstContainer,
  Image,
  MainHeader,
  Text,
  InputBox,
  InputText,
  InputButton,
  FormStyle,
  TextInEnd,
  SignInText,
  FinishBlock,
  QuestionForm,
} from './SignUpFirst.styled';

import checkEmail from '../checkEmail';
import { signupSchema } from '../validationLibs';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUpFirst = ({ goNext, setName, setEmail, setPassword }) => {
  const handleSubmit = async ({ name, email, password }) => {
    const res = await checkEmail(email.toLowerCase());
    const { message, status } = res.data;
    if (!(message === 'Accept for registration' && status === 'available')) {
      <ErrorMessage name="email" />;
    }
    setName(name);
    setEmail(email.toLowerCase());
    setPassword(password);
    goNext();
  };

  const togglePass = () => {
    const pass = document.getElementById('password');
    pass.type === 'password' ? (pass.type = 'text') : (pass.type = 'password');
  };

  const isRetinaDisplay =
    window.matchMedia &&
    window.matchMedia(
      '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
    ).matches;

  const image = isRetinaDisplay ? highQualityImage : lowQualityImage;

  return (
    <SignUpFirstContainer>
      <Image src={image} alt="Sport and fitness tracker" />
      <QuestionForm>
        <MainHeader>Sign up</MainHeader>
        <Text>You need to register to use the service</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signupSchema}
        >
          {() => (
            <FormStyle autoComplete="off">
              <InputBox>
                <label htmlFor="name" />
                <InputText
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </InputBox>
              <ErrorMessage name="name" component="div" />
              <InputBox>
                <label htmlFor="email" />
                <InputText
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  required
                />
              </InputBox>
              <ErrorMessage name="email" component="div" />

              <InputBox>
                <label htmlFor="password" />
                <InputText
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </InputBox>
              <button type="button" onClick={togglePass}>
                Show
              </button>
              <ErrorMessage name="password" component="div" />
              <InputButton type="submit">Sign Up</InputButton>
            </FormStyle>
          )}
        </Formik>
        <FinishBlock>
          <TextInEnd>Do you already have an account?</TextInEnd>
          <SignInText to="/signin">Sign in</SignInText>
        </FinishBlock>
      </QuestionForm>
    </SignUpFirstContainer>
  );
};

export default SignUpFirst;

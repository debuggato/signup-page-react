import { useState, useRef } from 'react';
import './App.css';
import { Oval } from 'react-loader-spinner';
import { CSSTransition } from 'react-transition-group';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';

type Inputs = {
  name: string
  email: string
  password: string
}

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' })

  const bannerRef = useRef(null)
  const formRef = useRef(null)

  const [showPassword, setShowPassword] = useState(false)
  const [canAccess, setCanAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true)
    setIsAnimating(true)

    setTimeout(() => {
      setIsLoading(false)
      setCanAccess(true)
      setIsAnimating(false)
    }, 1500)

    // call the api for athentication
    // and send data here
    console.log(data)
  }

  const renderWelcomePage = () => (
    <div className='WelcomePage animate__animated animate__fadeInUp'>
      <h1>Welcome!</h1>
    </div>
  )

  return (
    <div className="App">
      <CSSTransition
        classNames={{
          exitActive: 'animate__animated animate__fadeOutLeft',
          exitDone: 'Transition-ExitDone'
        }}
        in={isAnimating}
        timeout={200}
        nodeRef={formRef}
      >
        <div ref={formRef} className='FormSection'>
          <div className='HeaderWrapper'>
            <h1>Sign up today</h1>
            <p>Join along with more than 1 million users</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='FormWrapper'>
              <span className='Caption'>*Fields required</span>
              <div className='Field'>
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  id="name"
                  data-testid="name"
                  className={classNames({
                    "ErrorField": errors.name
                  })}
                  {...register("name", { required: true })}
                />
                {errors.name && <span data-testid="error-name" className='Error'>This field is required</span>}
              </div>
              <div className='Field'>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  data-testid="email"
                  className={classNames({
                    "ErrorField": errors.email
                  })}
                  {...register("email", {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "The value must be an email"
                    }
                  })}
                />
                {errors.email?.message && <span data-testid="error-email" className='Error'>{errors.email.message}</span>}
              </div>
              <div className='Field'>
                <label htmlFor="password">Password*</label>
                <div className='PasswordWrapper'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    data-testid="password"
                    className={classNames({
                      "ErrorField": errors.password
                    })}
                    {...register("password", { required: true })}
                  />
                  {showPassword ? (
                    <i
                      onClick={() => setShowPassword(false)}
                      className='bi bi-eye-slash-fill'
                    />
                  ) : (
                    <i
                      onClick={() => setShowPassword(true)}
                      className='bi bi-eye-fill'
                    />
                  )}
                </div>
                {errors.password && <span data-testid="error-password" className='Error'>This field is required</span>}
              </div>
              <button
                className='SubmitBtn'
                type="submit"
                data-testid="signupBtn"
              >
                <Oval
                  visible={isLoading}
                  height={19}
                  width={19}
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  strokeWidth={6}
                />
                {!isLoading && <span>Signup</span>}
              </button>
            </div>
          </form>
          <p className='PolicyClaim'>
            By Signup you agree at our <a href="/dummyurl">Terms and conditions</a>
          </p>
          <div className='Separator'>
            <hr />
            <span>Or</span>
            <hr />
          </div>
          <button className='GoogleBtn'>
            <i className='bi bi-google' />
            <span>Sign up with Google</span>
          </button>
        </div>
      </CSSTransition>
      {canAccess && renderWelcomePage()}
      <CSSTransition
        nodeRef={bannerRef}
        classNames={{
          exitActive: 'animate__animated animate__fadeOutRight',
          exitDone: 'Transition-ExitDone'
        }}
        in={isAnimating}
        timeout={200}
      >
        <div ref={bannerRef} className='Banner'>
          <img src="./Banner.png" alt="Banner" />
        </div>
      </CSSTransition>
    </div>
  );
}

export default SignupPage;

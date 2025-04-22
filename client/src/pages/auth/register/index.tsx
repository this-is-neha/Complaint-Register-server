
// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { TextInputField, SelectGenderComponent, SelectComponent } from '../../../components/common/form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../../../../src/userContext';
// import AuthContext from '../../../../src/context';
// import { HeaderComponent, FooterComponent } from '../../../components/common';
// import axios from 'axios';

// const RegisterPage = () => {
//   const [showModal, setShowModal] = React.useState(false);
//   const { setRegisteredUserData } = useUserContext();
//   const auth = React.useContext(AuthContext);

//   const rules = Yup.object({
//     name: Yup.string().min(2).max(40).required(),
//     email: Yup.string().email().required(),
//     password: Yup.string()
//       .min(8)
//       .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password')], 'Confirm Password and Password do not match')
//       .required(),
//     role: Yup.string().matches(/^(admin|user)$/).required(),
//     address: Yup.string().required(),
//     image: Yup.mixed(),
//     phone: Yup.number(),
//     gender: Yup.string().matches(/^(male|female)$/).required(),
//     houseNo: Yup.string().required(),
//     toleName: Yup.string(),
//     occupation: Yup.string(),
//     birthdate: Yup.string(),
//   });
  

//   const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
//     resolver: yupResolver(rules),
//   });

//   const navigate = useNavigate();

//   const submitEvent = async (data:any) => {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         formData.append(key, data[key]);
//       });

//       const response = await axios.post('http://localhost:9006/auth/register', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       auth.setLoggedInUser(response.data.user);

//       const newUserData = {
//         name: data.name,
//         email: data.email,
//         address: data.address,
//         image: data.image,
//         gender: data.gender,
//         phone: data.phone,
//         houseNo: data.houseNo,
//         toleName: data.toleName,
//         occupation: data.occupation,
//         birthdate: data.birthdate,
//       };

//       setRegisteredUserData(newUserData);

//       toast.success(response.data.message);
//       setShowModal(true);
//     } catch (exception) {
//       console.log('RegisterException:', exception);
//       toast.error('Cannot register at this moment!');
//     }
//   };

  
//   const closeModal = () => {
//     setShowModal(false);
//     navigate('/activate');
//   };

//   useEffect(() => {
//     if (auth.loggedInUser) {
//       toast.info('You are already logged in');
//       navigate('${auth.loggedInUser.role}');
//     }
//   }, [auth, navigate]);

//   return (
//     <>
//       <HeaderComponent />

//       <div className="mx-auto">
//         <section className="bg-white">
//           <div className="flex justify-center mt-10">
//             <i className="fas fa-user-tag text-center text-gray-600 text-9xl"></i>
//           </div>

//           <div className="lg:grid lg:grid-cols-12 mt-10">
//             <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-12">
//               <div className="max-w-xl lg:max-w-3xl lg:w-full">
//                 <form onSubmit={handleSubmit(submitEvent)} className="mt-10 grid grid-cols-6 gap-6" noValidate={false}>
               
//                   <div className="col-span-6">
//                     <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
//                       Full Name<span className="text-red">*</span>
//                     </label>
//                     <TextInputField
//                       control={control}
//                       name="name"
//                       errMsg={errors?.name?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                      <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
//                        Phone<span className="text-red">*</span>
//                     </label>
//                   <TextInputField
//                       control={control}
//                       name="phone"
//                       errMsg={errors?.phone?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
//                       Tole Name<span className="text-red">*</span>
//                     </label>
//                     <TextInputField
//                       control={control}
//                       name="toleName"
//                       errMsg={errors?.toleName?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="houseNo" className="block text-xl font-medium text-gray-700">
//                       HouseNo<span className="text-red">*</span>
//                     </label>
//                     <TextInputField
//                       control={control}
//                       name="houseNo"
//                       errMsg={errors?.houseNo?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="occupation" className="block text-xl font-medium text-gray-700">
//                       Occupation<span className="text-red">*</span>
//                     </label>
//                     <TextInputField
//                       control={control}
//                       name="occupation"
//                       errMsg={errors?.occupation?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="Email" className="block text-xl font-medium text-gray-700"> Email </label>
//                     <TextInputField
//                       control={control}
//                       name="email"
//                       type="email"
//                       errMsg={errors?.email?.message as string}
//                       required={true}
//                     />
//                   </div>
//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="birthdate" className="block text-xl font-medium text-gray-700">
//                       Birthdate
//                     </label>
//                     <input
//                       className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none"
//                       type="text"
//                       id="birthdate"
//                       placeholder="YYYY-MM-DD"

//                     />
//                     {errors.birthdate && <p className="text-red-500">{errors.birthdate.message}</p>}
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="Password" className="block text-xl font-medium text-gray-700"> Password </label>
//                     <TextInputField
//                       control={control}
//                       name="password"
//                       type="password"
//                       errMsg={errors?.password?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="PasswordConfirmation" className="block text-xl font-medium text-gray-700">
//                       Password Confirmation
//                     </label>
//                     <TextInputField
//                       control={control}
//                       name="confirmPassword"
//                       type="password"
//                       errMsg={errors?.confirmPassword?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="gender" className="block text-xl font-medium text-gray-700">
//                       Gender
//                     </label>
//                     <SelectGenderComponent
//                       options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
//                       name="gender"
//                       control={control}
//                       errMsg={errors?.gender?.message}
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="role" className="block text-xl font-medium text-gray-700">
//                       Role
//                     </label>
//                     <SelectComponent
//                       options={[{ label: "Seller", value: "seller" }, { label: "Buyer", value: "customer" }]}
//                       name="role"
//                       control={control}
//                       errMsg={errors?.role?.message}
//                     />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                     <label htmlFor="Address" className="block text-xl font-medium text-gray-700"> Address </label>
//                     <TextInputField
//                       control={control}
//                       name="address"
//                       errMsg={errors?.address?.message as string}
//                       required={true}
//                     />
//                   </div>

//                   <div className="col-span-6">
//                     <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
//                       Image
//                     </label>
//                     <input
//                       className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
//                       id="file_input" type="file"
//                       onChange={(e: any) => {
//                         const uploaded = e.target.files[0];
//                         setValue('image', uploaded);
//                       }}
//                     />
//                   </div>


//                   <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                     <button
//                       className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-xl font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//                     >
//                       Create an account
//                     </button>
//                     <p className="mt-4 text-sm text-gray-500 sm:mt-0">
//                       Already have an account?
//                       <a href="/login" className="text-gray-700 underline">Log in</a>.
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </main>
//           </div>
//         </section>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <p className="text-xl font-medium mb-4">Registration Successful!</p>
//             <p className="text-gray-700">You have been successfully registered.</p>
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <FooterComponent />
//     </>
//   );
// };

// export default RegisterPage;




import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInputField, SelectGenderComponent, SelectComponent } from '../../../components/common/form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../src/userContext';
import AuthContext from '../../../../src/context';
import { HeaderComponent, FooterComponent } from '../../../components/common';
import axios from 'axios';

const RegisterPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { setRegisteredUserData } = useUserContext();
  const auth = React.useContext(AuthContext);

  const rules = Yup.object({
    name: Yup.string().min(2).max(40).required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8)
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Confirm Password and Password do not match')
      .required(),
    role: Yup.string().matches(/^(admin|user)$/).required(),
    address: Yup.string().required(),
    image: Yup.mixed(),
    phone: Yup.number(),
    gender: Yup.string().matches(/^(male|female)$/).required(),
    houseNo: Yup.string().required(),
    toleName: Yup.string().required(),
    occupation: Yup.string().required(),
    birthdate: Yup.string()
  });
  

  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(rules),
  });

  const navigate = useNavigate();

  const submitEvent = async (data:any) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const response = await axios.post('https://complaint-register-server-3.onrender.com/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      auth.setLoggedInUser(response.data.user);

      const newUserData = {
        name: data.name,
        email: data.email,
        address: data.address,
        image: data.image,
        gender: data.gender,
        phone: data.phone,
        houseNo: data.houseNo,
        toleName: data.toleName,
        occupation: data.occupation,
        birthdate: data.birthdate,
      };

      setRegisteredUserData(newUserData);

      toast.success(response.data.message);
      setShowModal(true);
    } catch (exception) {
      console.log('RegisterException:', exception);
      toast.error('Cannot register at this moment!');
    }
  };

  
  const closeModal = () => {
    setShowModal(false);
    navigate('/activate');
  };

  useEffect(() => {
    if (auth.loggedInUser) {
      toast.info('You are already logged in');
      navigate('${auth.loggedInUser.role}');
    }
  }, [auth, navigate]);

  return (
    <>
      <HeaderComponent />

      <div className="mx-auto">
        <section className="bg-white">
          <div className="flex justify-center mt-10">
            <i className="fas fa-user-tag text-center text-gray-600 text-9xl"></i>
          </div>

          <div className="lg:grid lg:grid-cols-12 mt-10">
            <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-12">
              <div className="max-w-xl lg:max-w-3xl lg:w-full">
                <form onSubmit={handleSubmit(submitEvent)} className="mt-10 grid grid-cols-6 gap-6" noValidate={false}>
               
                  <div className="col-span-6">
                    <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
                      Full Name<span className="text-red">*</span>
                    </label>
                    <TextInputField
                      control={control}
                      name="name"
                      errMsg={errors?.name?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                     <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
                       Phone<span className="text-red">*</span>
                    </label>
                  <TextInputField
                      control={control}
                      name="phone"
                      errMsg={errors?.phone?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
                      Tole Name<span className="text-red">*</span>
                    </label>
                    <TextInputField
                      control={control}
                      name="toleName"
                      errMsg={errors?.toleName?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="houseNo" className="block text-xl font-medium text-gray-700">
                      HouseNo<span className="text-red">*</span>
                    </label>
                    <TextInputField
                      control={control}
                      name="houseNo"
                      errMsg={errors?.houseNo?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="occupation" className="block text-xl font-medium text-gray-700">
                      Occupation<span className="text-red">*</span>
                    </label>
                    <TextInputField
                      control={control}
                      name="occupation"
                      errMsg={errors?.occupation?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="Email" className="block text-xl font-medium text-gray-700"> Email </label>
                    <TextInputField
                      control={control}
                      name="email"
                      type="email"
                      errMsg={errors?.email?.message as string}
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="birthdate" className="block text-xl font-medium text-gray-700">
                      Birthdate
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none"
                      type="text"
                      id="birthdate"
                      placeholder="YYYY-MM-DD"

                    />
                    {errors.birthdate && <p className="text-red-500">{errors.birthdate.message}</p>}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Password" className="block text-xl font-medium text-gray-700"> Password </label>
                    <TextInputField
                      control={control}
                      name="password"
                      type="password"
                      errMsg={errors?.password?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="PasswordConfirmation" className="block text-xl font-medium text-gray-700">
                      Password Confirmation
                    </label>
                    <TextInputField
                      control={control}
                      name="confirmPassword"
                      type="password"
                      errMsg={errors?.confirmPassword?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="gender" className="block text-xl font-medium text-gray-700">
                      Gender
                    </label>
                    <SelectGenderComponent
                      options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
                      name="gender"
                      control={control}
                      errMsg={errors?.gender?.message}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="role" className="block text-xl font-medium text-gray-700">
                      Role
                    </label>
                    <SelectComponent
                      options={[{ label: "Seller", value: "seller" }, { label: "Buyer", value: "customer" }]}
                      name="role"
                      control={control}
                      errMsg={errors?.role?.message}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="Address" className="block text-xl font-medium text-gray-700"> Address </label>
                    <TextInputField
                      control={control}
                      name="address"
                      errMsg={errors?.address?.message as string}
                      required={true}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
                      Image
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                      id="file_input" type="file"
                      onChange={(e: any) => {
                        const uploaded = e.target.files[0];
                        setValue('image', uploaded);
                      }}
                    />
                  </div>


                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-xl font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Create an account
                    </button>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Already have an account?
                      <a href="/login" className="text-gray-700 underline">Log in</a>.
                    </p>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-medium mb-4">Registration Successful!</p>
            <p className="text-gray-700">You have been successfully registered.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <FooterComponent />
    </>
  );
};

export default RegisterPage;


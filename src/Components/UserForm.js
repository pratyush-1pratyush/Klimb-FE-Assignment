import React, { useEffect, useState } from 'react'


const UserForm = ({formMode, onSubmit, initialValues, onCancel}) => {

    const initial = [
        {
          Name:"",
          Phone:"", 
          Email:"", 
          Type:"", 
          Location:"", 
          Function:"" 
        }
    ]
    const [formValues, setFormValues] = useState(initial);
    const [errors, setErrors] = useState({});
   
    useEffect(() => {
        if (initialValues) {
          setFormValues(initialValues);
        }
      }, [initialValues]);

      
    const validate = () => {
        const errors = {};
        if (!formValues.Name) errors.Name = ' Name is required';
        if (!formValues.Phone) {
            errors.Phone = 'Phone number is required';
          } else if (!/^\d{10}$/.test(formValues.Phone)) {
            errors.Phone = 'Phone number is not valid';
          }
        if (!formValues.Email) {
            errors.Email = 'Email is required';
          } 
          else if (!/\S+@\S+\.\S+/.test(formValues.Email)) {
            errors.Email = 'Enter a valid email';
          }
        if(!formValues.Type){
            errors.Type = 'Please enter the role'
        }
        if(!formValues.Location){
            errors.Location = 'Please enter the Location'
        }
        if(!formValues.Function){
            errors.Function = 'Please enter the Department'
        }
       return errors;
        
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          
          onSubmit(formValues);
          
        }
        console.log(formValues)
      };


      return (
        <div className="mt-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
        
        <h2 className="m-2 w-full text-left text-xl text-gray-500 mb-4">
        {formMode === 'edit' ? 'Edit User' : 'Add User'}
      </h2>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-gray-300 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg flex flex-wrap justify-between"
        >
           
            <p className='w-full text-right mb-4 italic text-gray-400'>All fields are mandatory</p>
          
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1"> NAME <span className="text-red-500">*</span></label>
              <input
                className="border-2 h-10 rounded-md p-2 w-full"
                id="name"
                name="Name"
                type="text"
                placeholder="Name"
               
                onChange={handleChange}
                value={formValues.Name}
              />
              {errors.Name && <div className="text-red-500">{errors.Name}</div>}
            </div>
          </div>
         
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1">PHONE <span className="text-red-500">*</span></label>
              <input
                className="border-2 h-10 rounded-md p-2 w-full"
                id="phone"
                name="Phone"
                type="text"
                placeholder="Phone Number"
              
                onChange={handleChange}
                value={formValues.Phone}
              />
              {errors.Phone && <div className="text-red-500">{errors.Phone}</div>}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1">EMAIL ID <span className="text-red-500">*</span></label>
              <input
                className="border-2 h-10 rounded-md p-2 w-full"
                id="email"
                name="Email"
                type="email"
                placeholder="Email Id"
               
                onChange={handleChange}
                value={formValues.Email}
              />
              {errors.Email && <div className="text-red-500">{errors.Email}</div>}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1">ROLE <span className="text-red-500">*</span></label>
              <select
                className="border-2 h-10 rounded-md p-2 w-full"
                id="type"
                name="Type"
                
                onChange={handleChange}
                value={formValues.Type}
                >
                <option  disabled selected value>Select a role</option>
                <option value="CEO">CEO</option>
                <option value="Employee">Employee</option>
                <option value="Founder">Founder</option>
                <option value="Manager">Manager</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Vice President">Vice President</option>
                
              </select>
              {errors.Type && <div className="text-red-500">{errors.Type}</div>}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1">LOCATION <span className="text-red-500">*</span></label>
              <input
                className="border-2 h-10 rounded-md p-2 w-full"
                id="location"
                name="Location"
                type="text"
                placeholder="Location"
                
                onChange={handleChange}
                value={formValues.Location}
              />
              {errors.Location && <div className="text-red-500">{errors.Location}</div>}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col">
              <label className="mb-1">DEPARTMENT <span className="text-red-500">*</span></label>
              <select
                className="border-2 h-10 rounded-md p-2 w-full"
                id="function"
                name="Function"
                type="text"
                placeholder="Department"
                onChange={handleChange}
                value={formValues.Function}
              >

                <option  disabled selected value>Select a Department</option>
                <option value="Developer">Developer</option>
                <option value="Founding Team">Founding Team</option>
                <option value="Product Management">Product Management</option>
                <option value="Tester">Tester</option>
                <option value="Talent Acquisition">Talent Acquisition</option>
                <option value="Vice President">Vice President</option>
                
             </select>
              {errors.Function && <div className="text-red-500">{errors.Function}</div>}
            </div>
          </div>
         
          
          <div className="w-full flex justify-center mt-4">
            <button
              className="bg-green-500 px-8 py-2 rounded-md text-white"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-green-500 px-8 py-2 ml-2 rounded-md text-white"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      );
    }
export default UserForm
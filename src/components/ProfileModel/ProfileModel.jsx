import React from 'react'  
import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/userAction';
import { uploadImage } from '../../actions/UploadAction';

const ProfileModel = ({modalOpened,setModalOpened,data}) => {
    const theme = useMantineTheme();

    const {password,...other} = data;
    const [formData,setFormData] = useState(other)
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage,setCoverImage] = useState(null)

    const dispatch = useDispatch()
    const params = useParams()
    const {user} = useSelector((state) =>state.authReducer.authData)

    const handleChange = (e) =>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        event.target.name === "profileImage"
          ? setProfileImage(img)
          : setCoverImage(img);
      }
    };

    const handleSubmit = (e) =>{
      e.preventDefault();
      let UserData = formData;
      if(profileImage){
        const data = new FormData();
        const fileName = Date.now() + profileImage.name
        data.append("name" ,fileName)
        data.append('file',profileImage)
        UserData.profilePicture = fileName;
        try{
          dispatch(uploadImage(data));
        }catch(e){
          console.log(e)
        }
      }

      if (coverImage) {
        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file", coverImage);
        UserData.coverPicture = fileName;
        try {
          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(updateUser(params.id, UserData));
      setModalOpened(false);
    }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      
      <form  className="infoForm">
          <h3>Your info</h3>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange={handleChange}
              value = {formData.firstname}
            />
             <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange={handleChange}
              value = {formData.lastname}
            />
          </div>


          <div>
            <input
              type="text"
              placeholder="Works at"
              className="infoInput"
              name="worksat"
              onChange={handleChange}
              value = {formData.worksat}
            />
          </div>


          <div>
            <input
              type="text"
              placeholder="lives in"
              className="infoInput"
              name="livesin"
              onChange={handleChange}
              value = {formData.livesin}
            />
             <input
              type="text"
              placeholder="Country"
              className="infoInput"
              name="country"
              onChange={handleChange}
              value = {formData.country}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Relationship Status"
              className="infoInput"
              name='relationship'
              onChange={handleChange}
              value = {formData.relationship}
            />
          </div>
          <div>
              Profile Image
              <input type="file" name='profileImage' onChange={onImageChange}/>
              Cover Image
              <input type="file" name='coverImage' onChange={onImageChange} />
          </div>
          <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  )
}

export default ProfileModel
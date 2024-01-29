import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from './store/notificationSlice';

export const Notification = () => {
  const dispatch = useDispatch();
  const { type, message, open, loading } = useSelector((state) => state.notification);

  const handleNotificationClose = () => {
    dispatch(notificationActions.makeNotification({ open: false }))
  }

  useEffect(() => {
    let intervalId =  setTimeout(() => {
      handleNotificationClose();
    }, 2500);

    return () => {
      clearTimeout(intervalId)
    }
  }, [open])

  return (
    <div style={{ cursor: "pointer" }}>
      {open &&
        <Alert severity={type}>
          <div className='d-flex align-center justify-center'>

            <div className='w-95 h-100'>
              {loading && <CircularProgress size={20} style={{ marginRight: '10px' }} />}
              <b>{message}</b>
            </div>
            <div className='w-5 h-100'>
              <i onClick={handleNotificationClose} className="fa-solid fa-circle-xmark fa-xl" style={{ color: "tomato", marginLeft: "5px" }} ></i>
            </div>
          </div>
        </Alert>
      }
    </div>
  )
}

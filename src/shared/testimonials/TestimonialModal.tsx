'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useAuthenticated, useUserDisplayName, useUserId } from '@nhost/nextjs';
import { Box } from '@mui/material';
import Button from '@mui/joy/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  fetchAllCategories,
  insert_testimonial_submission
} from '@/services/request/query/testimonials';
import { submit } from '@/services/request';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DOMPurify from 'dompurify';
import { IoAddSharp } from 'react-icons/io5';
import { NHOST } from '@/constants/nhost';

function escapeNewLinesAndQuotes(inputString: string) {
  const regex = /[\n\r"']/g;
  const escapeMap: Record<string, string> = {
    '\n': '\\n',
    '\r': '\\r',
    '"': '""',
    "'": "'"
  };

  return inputString.replace(regex, (match) => escapeMap[match]);
}

export default function TestimonialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthenticated();
  const userDisplayName = useUserDisplayName();
  const userId = useUserId();
  const [testimonialData, setTestimonialData] = useState({
    quote: '',
    event: '',
    id: userId
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await submit(fetchAllCategories());
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const handleLogin = (value: string) => {
    return (window.location.href = NHOST.AUTH_URL(window.location.href, value));
  };

  const onAddTestimonial = async () => {
    if (!isAuthenticated) return handleLogin('github');
    setIsOpen(!isOpen);
  };

  const updateData = (fieldName: string, val: string) => {
    let value = val;
    const regex = /<("[^"]*"|'[^']*'|[^'">])*>/;
    if (value.match(regex)) {
      value = DOMPurify.sanitize(value);
    }

    value = escapeNewLinesAndQuotes(value);

    setTestimonialData((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  useEffect(() => {
    if (
      testimonialData.quote.length != 0 &&
      Number(testimonialData.event) != 0 &&
      testimonialData.quote.length <= 1024
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [testimonialData]);

  const addTestimonial = async () => {
    try {
      const response = await submit(insert_testimonial_submission(testimonialData));
      setIsOpen(false);
      toast.success(
        'Thank you! Your Testimonial has been submitted for a review and we will publish it soon',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }
      );

      return response;
    } catch (error) {
      toast.error('Error', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  };

  return (
    <>
      <div className="flex p-3 justify-end max-w-[1600px] mx-auto">
        <button
          className="px-2.5 py-2 sm:px-4 sm:py-3 bg-[#00f2fe] rounded-lg text-black outline-none  shadow-lg transform mx-5 flex justify-center items-center"
          type="button"
          onClick={onAddTestimonial}
        >
          <IoAddSharp className="icon h-5 w-5 sm:h-6 sm:w-6" />
          <span className="ml-1 sm:ml-2 md:text-lg">Testimonial</span>
        </button>
      </div>
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        theme="light"
      />
      <ToastContainer />
      <Modal
        aria-describedby="modal-desc"
        aria-labelledby="modal-title"
        open={isOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 20px'
        }}
        onClose={() => setIsOpen(false)}
      >
        <Sheet
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg'
          }}
          variant="outlined"
        >
          <ModalClose
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '40%',
              bgcolor: 'background.body'
            }}
            variant="outlined"
          />
          <Typography
            component="h2"
            fontWeight="lg"
            id="modal-title"
            level="h4"
            mb={1}
            textColor="inherit"
          >
            Thank You, {userDisplayName} !
          </Typography>
          <Box component="div" sx={{ display: 'flex', p: '4px 0px', flexDirection: 'column' }}>
            <Box component="div" sx={{ display: 'flex', p: '5px 5px', flexDirection: 'column' }}>
              <Typography fontWeight="md">Enter your testimonial:</Typography>
              <textarea
                className="max-h-[150px] overflow-y-scroll rounded-md  resize-none border border-gray-400 p-1"
                name="quote"
                rows={4}
                onChange={(e) => updateData(e.target.name, e.target.value)}
              />
              <Box />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: '10px 10px',
                  marginTop: '5px'
                }}
              >
                <Box>
                  <FormControl sx={{ minWidth: 110 }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                      id="demo-simple-select-standard"
                      labelId="demo-simple-select-standard-label"
                      name="event"
                      sx={{}}
                      value={testimonialData.event}
                      onChange={(e) => updateData(e.target.name, e.target.value)}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    marginTop: '3px'
                  }}
                >
                  <Button disabled={btnDisabled} onClick={addTestimonial}>
                    ADD
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}

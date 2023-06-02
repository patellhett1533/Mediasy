import React, { useState } from 'react';
import { DialogActions, DialogContent, Cancel } from '@mui/material';
import CropIcon from '@mui/material/crop';
import Cropper from 'react-easy-crop';

const Post = ({photoURL, setOpenCrop}) => {
  const [crop, setCrop] = useState({x:0, y:0})
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixel, setCroppedAreaPixel] = useState(null)

  const cropComplate = (croppedArea, croppedAreaPixel) => {
    setCroppedAreaPixel(croppedAreaPixel)
  }

  const cropImage = async () => {
    
  }
  return (
    <>
    <DialogContent dividers
    sx={{
      background:"#f8f8f8",
      position:"relatives",
      height:400,
      width:"auto",
      minWidth:{sm:500}
    }}>
      <Cropper 
      image={photoURL}
      crop={crop}
      zoom={zoom}
      aspect={4/5}
      setCropChange={setCrop}
      setZoomChange={setZoom}
      setCropComplate={cropComplate}
       />
    </DialogContent>
    <DialogActions sx={{flexDirection: "column", mx:3, my:2}}>
      <Box sx={{width:"100%", mb:1}}>
        <Box>
          <Typography>Zoom : {zoomPercent(zoom)}</Typography>
          <Slider 
          valueLabelDisplay="auto"
          valueLabelFormat={zoomPercent}
          min={1}
          max={3}
          step={01}
          value={zoom}
          onChange={(e, zoom) => setZoom(zoom)}

          />
        </Box>
      </Box>
      <Box 
      sx={{
        display:"flex",
        gap:2,
        flexWrap: "wrap"
      }}
      >
        <Button 
        varient="outlined"
        startIcon={<Cancel />}
        onClick={()=>setOpenCrop(false)}
        >
          Cancel
        </Button>
        <Button 
        varient="contained"
        startIcon={<CropIcon />}
        onClick={cropImage}
        >
          Crop
        </Button>
      </Box>
    </DialogActions>
    </>
  )
}

export default Post

const zoomPercent = (value) => {
  return `${Math.round(value + 100)}%`
}
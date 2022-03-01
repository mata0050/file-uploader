const express = require('express');
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  // limits: { fileSize: 10 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Images with jpeg, jpg, png Only!');
  }
}

const app = express();
app.use(express.json({ extended: false }));
app.use(express.static('/public'));

app.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(req.file);
    }
  });
});

app.get('/', (req, res) => {
  res.json({ k: 'hello' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

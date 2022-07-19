const express = require('express');
// const cors = require('cors')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./database/connect');
const path = require('path');

// app.use(cors())
connectDB();

app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }


app.listen(port, () => console.log(`Server started on port ${port}`));
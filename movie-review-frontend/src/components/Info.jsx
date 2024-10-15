import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// Replace product info with movie info
const movies = [
  {
    title: 'Inception',
    desc: 'Sci-fi thriller directed by Christopher Nolan',
    rating: '9/10',
  },
  {
    title: 'The Matrix',
    desc: 'Futuristic action directed by the Wachowskis',
    rating: '8.7/10',
  },
  {
    title: 'Interstellar',
    desc: 'Space exploration directed by Christopher Nolan',
    rating: '8.6/10',
  },
  {
    title: 'Parasite',
    desc: 'Thriller directed by Bong Joon-ho',
    rating: '8.6/10',
  },
];

function Info({ totalMovies }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Top Movies
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalMovies}
      </Typography>
      <List disablePadding>
        {movies.map((movie) => (
          <ListItem key={movie.title} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={movie.title}
              secondary={movie.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {movie.rating}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalMovies: PropTypes.string.isRequired,
};

export default Info;

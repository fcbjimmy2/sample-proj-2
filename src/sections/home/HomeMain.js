// @mui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// third-party
import { FormattedMessage } from 'react-intl';
// components
import { Image } from '../../components';
// next
import NextLink from 'next/link';
// config
import { BASE_URL } from '../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeMain() {
  return (
    <RootStyle>
      <Container>
        <Grid container spacing={{ xs: 8, md: 3 }} justifyContent="space-between">
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h1" sx={{ color: 'text.primary' }}><FormattedMessage id="online-courses" /></Typography>
            <Typography variant="body2" sx={{ mt: 3, mb: 6, color: 'text.primary' }}>
              Nunc nulla. Ut leo. Pellentesque commodo eros a enim. Nunc egestas, augue at
              pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.
            </Typography>

            <Button 
              component={NextLink}
              variant="contained" 
              size="large" 
              href="/courses"
            >
              Browse Courses
            </Button>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Image
              alt="courses-online"
              src={`${BASE_URL}/assets/courses_main.svg`}
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

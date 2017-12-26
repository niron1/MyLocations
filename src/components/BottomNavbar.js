import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconPlace from 'material-ui/svg-icons/maps/edit-location';
import IconAssignment from 'material-ui/svg-icons/action/assignment';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router';
import styles from './BottomNavbar.css';

const iconPlace = <IconPlace />;
const iconAssignment = <IconAssignment />;

export class BottomNavbar extends React.PureComponent {
  render() {
    return (
      <Paper className={styles.panel} zDepth={1}>
        <BottomNavigation selectedIndex={this.props.location.pathname === '/locations' ? 1 : 0}>
          <BottomNavigationItem
            icon={iconAssignment}
            label="Categories"
            onClick={() => this.props.history.push('/categories')}
          />
          <BottomNavigationItem
            label="Locations"
            icon={iconPlace}
            onClick={() => this.props.history.push('/locations')}
          />
        </BottomNavigation>
        <Snackbar
          open={!!this.props.snackbarMsg}
          message={this.props.snackbarMsg || ''}
          autoHideDuration={4000}
          onRequestClose={this.props.closeSnackbar}
        />
      </Paper>
    );
  }
}
export default withRouter(BottomNavbar);

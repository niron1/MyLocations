import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import logo from './logo.svg';
import * as styles from './App.css';

class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <Row center="xs">
            <Col>
              <div className={styles.App}>
                <header className={styles.Appheader}>
                  <img src={logo} className={styles.Applogo} alt="logo" />
                  <h1 className={styles.Apptitle}>myLocations</h1>
                </header>
                {this.props.children}
              </div>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;

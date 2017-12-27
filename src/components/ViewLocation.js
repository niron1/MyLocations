import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BottomNavbar from './BottomNavbar';
import styles from './ViewLocation.css';

export class ViewLocation extends React.Component {
  constructor(props) {
    super(props);
    const viewId = this.props.match.params.locationId;
    let name = '';
    let address = '';
    let lat = '';
    let lon = '';
    let categoryId = '';
    if (viewId) {
      name = this.props.locations.list[viewId].name;
      address = this.props.locations.list[viewId].address;
      lat = this.props.locations.list[viewId].lat;
      lon = this.props.locations.list[viewId].lon;
      categoryId = this.props.locations.list[viewId].category_id;
    } else this.props.history.goBack();

    this.state = {
      viewId,
      name,
      address,
      lat,
      lon,
      categoryId,
    };
  }
  render() {
    return (
      <Grid>
        <Row center="xs">
          <Col>
            <div className={styles.topLine}>
              <RaisedButton
                icon={<IconBack />}
                className={styles.backButton}
                onClick={() => { this.props.history.goBack(); }}
              />
              <h3 className={styles.header}>
                View Location
              </h3>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.fieldRow}>
                <label className={styles.fieldName}>name:</label>
                <label className={styles.fieldValue}>{this.state.name}</label>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldName}>address:</label>
                <label className={styles.fieldValue}>{this.state.address}</label>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldName}>lat:</label>
                <label className={styles.fieldValue}>{this.state.lat}</label>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldName}>lon:</label>
                <label className={styles.fieldValue}>{this.state.lon}</label>
              </div>
              <div className={styles.fieldRow}>
                <label className={styles.fieldName}>category:</label>
                <label className={styles.fieldValue}>{this.props.categories.list[this.state.categoryId].name}</label>
              </div>
            </div>
            <BottomNavbar />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(ViewLocation);

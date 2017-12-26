import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import BottomNavbar from './BottomNavbar';
import styles from './EditLocation.css';

export class EditLocation extends React.Component {
  constructor(props) {
    super(props);
    this.locationNameChanged = this.locationNameChanged.bind(this);
    this.addressChanged = this.addressChanged.bind(this);
    this.latChanged = this.latChanged.bind(this);
    this.lonChanged = this.lonChanged.bind(this);
    this.categoryIdChanged = this.categoryIdChanged.bind(this);
    this.handleEditAddLocation = this.handleEditAddLocation.bind(this);
    let location = { name: '', address: '', lat: 0, lon: 0, category_id: null };
    const editId = this.props.match.params.locationId;
    if (editId) {
      location = this.props.locations.list[editId];
      location.category_id = String(location.category_id);
    }
    this.state = {
      ...location,
      editId,
      errorMsgName: location.name ? '' : 'Required field',
      errorMsgAddress: location.address ? '' : 'Required field',
      errorMsgLat: location.lat ? '' : 'Required field',
      errorMsgLon: location.lon ? '' : 'Required field',
      errorMsgCategoryId: location.category_id ? '' : 'Required field',
    };
  }
  locationNameChanged(e) {
    this.setState({
      errorMsgName: e.target.value ? '' : 'Required field',
      name: e.target.value,
    });
  }
  addressChanged(e) {
    this.setState({
      errorMsgAddress: e.target.value ? '' : 'Required field',
      address: e.target.value,
    });
  }
  latChanged(e) {
    this.setState({
      errorMsgLat: e.target.value ? '' : 'Required field',
      lat: e.target.value,
    });
  }
  lonChanged(e) {
    this.setState({
      errorMsgLon: e.target.value ? '' : 'Required field',
      lon: e.target.value,
    });
  }
  categoryIdChanged(e, k, v) {
    this.setState({
      errorMsgCategoryId: v ? '' : 'Required field',
      category_id: v,
    });
  }


  handleEditAddLocation() {
    const obj = {
      name: this.state.name,
      address: this.state.address,
      lat: this.state.lat,
      lon: this.state.lon,
      category_id: this.state.category_id,
    };
    if (this.state.editId) {
      this.props.editLocation(this.state.editId, obj);
    } else {
      this.props.addLocation(obj);
    }
    this.props.history.push('/locations');
    this.props.openSnackbar(`Location item '${this.state.name}' has been ${this.state.editId ? 'edited' : 'added'} succesfully`);
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
                {this.state.editId ? 'Edit Location' : 'Add Location'}
              </h3>
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor="location_name">Name</label>
              <TextField
                id="location_name"
                errorText={this.state.errorMsgName}
                onChange={this.locationNameChanged}
                value={this.state.name}
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor="address">Address</label>
              <TextField
                id="address"
                errorText={this.state.errorMsgAddress}
                onChange={this.addressChanged}
                value={this.state.address}
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor="lat">Latitude</label>
              <TextField
                id="lat"
                errorText={this.state.errorMsgLat}
                onChange={this.latChanged}
                value={this.state.lat || ''}
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor="lon">Longitude</label>
              <TextField
                id="lon"
                errorText={this.state.errorMsgLon}
                onChange={this.lonChanged}
                value={this.state.lon || ''}
              />
            </div>
            <div className={styles.fieldRow}>
              <label htmlFor="category">Category</label>
              <SelectField id="category" onChange={this.categoryIdChanged} value={this.state.category_id}>
                {
                  Object.keys(this.props.categories.list).map((id) =>
                    <MenuItem key={id} value={id} primaryText={this.props.categories.list[id].name} />)
                }
              </SelectField>

            </div>
            <div className={styles.actionBox}>
              <RaisedButton className={styles.submitButton} label={this.state.editId ? 'Update' : 'Add'} primary disabled={!!this.state.errorMsgName || !!this.state.errorMsgAddress || !!this.state.errorMsgLat || !!this.state.errorMsgLon || !!this.state.errorMsgCategoryId} onClick={this.handleEditAddLocation} />
            </div>
            <BottomNavbar />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(EditLocation);

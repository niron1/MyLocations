import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BottomNavbar from './BottomNavbar';
import styles from './EditCategory.css';

export class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.categoryNameChanged = this.categoryNameChanged.bind(this);
    this.handleEditAddCategory = this.handleEditAddCategory.bind(this);
    const editId = this.props.match.params.categoryId;
    let name = '';
    if (editId) name = this.props.categories.list[editId].name;
    this.state = {
      editId,
      name,
      errorMsg: name ? '' : 'Required field',
    };
  }
  categoryNameChanged(e) {
    this.setState({
      errorMsg: e.target.value ? '' : 'Required field',
      name: e.target.value,
    });
  }
  handleEditAddCategory() {
    if (this.state.editId) {
      this.props.editCategory(this.state.editId, this.state.name);
    } else {
      this.props.addCategory(this.state.name);
    }
    this.props.history.push('/categories');
    this.props.openSnackbar(`Category item '${this.state.name}' has been ${this.state.editId ? 'edited' : 'added'} succesfully`);
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
                {this.state.editId ? 'Edit Category' : 'Add Category'}
              </h3>
            </div>
            <div className={styles.fieldRow}>
              <TextField
                hintText="Category name"
                errorText={this.state.errorMsg}
                onChange={this.categoryNameChanged}
                value={this.state.name}
              />
            </div>
            <div className={styles.actionBox}>
              <RaisedButton label={this.state.editId ? 'Update' : 'Add'} primary disabled={!!this.state.errorMsg} onClick={this.handleEditAddCategory} />
            </div>
            <BottomNavbar />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(EditCategory);

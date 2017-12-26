import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BottomNavbar from './BottomNavbar';
import styles from './ViewCategory.css';

export class ViewCategory extends React.Component {
  constructor(props) {
    super(props);
    const viewId = this.props.match.params.categoryId;
    let name = '';
    if (viewId) name = this.props.categories.list[viewId].name;
    else this.props.history.goBack();

    this.state = {
      viewId,
      name,
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
                View Category
              </h3>
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldName}>name:</label>
              <label className={styles.fieldValue}>{this.state.name}</label>
            </div>
            <BottomNavbar />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(ViewCategory);

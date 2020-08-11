import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from './util/API.js';
import TextField from '@material-ui/core/TextField';



class EmployeeSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      employees: [],
    };
  }

  async componentDidMount() {
    // AJAX Call
    let result = await API.get("employees")

    this.setState({
      isLoaded: true,
      employeeData: result.data,
      employees: result.data
    });

  }

  handleChange = (e) => {
    let searchValue = e.target.value;
    const { employeeData } = this.state;
    let filtered = employeeData.filter((employee) => employee.name.includes(searchValue));
    this.setState({
      employees: filtered
    });
  }

  render() {
    const classes = {
      root: {
        maxWidth: 275,
        color: "red",
        margin: "10px"
      },
      title: {
        fontSize: 18,
      },
      pos: {
        marginBottom: 12,
      },
    };

    const { error, isLoaded, employees } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    return(
      <div>
          <form noValidate autoComplete="off">  
          <div>
            <TextField  
              id="outlined-textarea"
              label="Enter Employee"
              placeholder="Name"
              multiline
              variant="outlined"
              onChange={this.handleChange}
            />      
          </div>
        </form>
        {employees.map(employee => (
            <div key={employee.name}>
              <Card style={classes.root}>
              <CardContent>
                <Typography style={classes.title} color="textSecondary" gutterBottom>
                  Employee
                </Typography>
                <Typography variant="h5" component="h2">
                  {employee.name}
                </Typography>
                <Typography style={classes.pos} color="textSecondary">
                  {employee.department}
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            </div>
          ))}
      </div>

      );
    }
  }
}
export default EmployeeSearch

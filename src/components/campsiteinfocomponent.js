import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';

  function RenderCampsite({campsite}) {
      return (
        <div className="col-md-5 m-1">
          <Card>
              <CardImg top src={campsite.image} alt={campsite.name} />
              <CardBody>
                  <CardText>{campsite.description}</CardText>
              </CardBody>
          </Card>
        </div>
      );
    }

  function RenderComments({comments}) {
    if (comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p>
                  {comment.text}
                  <br />
                  -- {comment.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </div>
            );
          })}
          <CommentForm />
        </div>
      );
    }
    return <div/>;
  }

  function CampsiteInfo(props) {
        if (props.campsite) {
        return (
            <div className= 'container'>
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}s</h2>
                    <hr />
                </div>
            </div>
                <div className='row'>
                    <RenderCampsite campsite= {props.campsite} />
                    <RenderComments comments= {props.comments} />
                </div>
            </div>
        );
    } else {
      return(
          <div/>
      );
    }
  }

class CommentForm extends Component {
  constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(this.state));
        this.toggleModal()
    }

  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil fa-lg"/> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} >
          <ModalHeader>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <div className="form-group">
                    <Label htmlFor="rating" >Rating</Label>
                     <Control.select className="form-control"
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control">
                       <option value="/">Select An Option</option>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                     </Control.select>
                  </div> 
                  <div className="form-group">
                    <Label htmlFor="author">Author</Label>
                      <Control.text 
                      model=".author" 
                      id="author" 
                      name="author"
                      placeholder="First Name"
                      className="form-control"
                      />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="text">Comment</Label>
                      <Control.textarea 
                      rows="6"
                      model=".text" 
                      id="text" 
                      name="text"
                      className="form-control"
                      />
                  </div>
                  <div className="form-group">
                    <Button type="submit" color="primary">
                      Submit Comment
                    </Button>
                  </div>
                </LocalForm>
            </ModalBody>
        </Modal>
      </React.Fragment>
      )
  }
}


export default CampsiteInfo;
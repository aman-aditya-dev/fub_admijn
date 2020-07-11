import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import Utils from "../../../utils";
import FileBase64 from "react-file-base64";
import Service from "../../../services";
import LoadingSpinner from "../../../common/spinner";

class ProductsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingSpinner: false,
      category: "vegetables",
      price: "",
      costPrice: "",
      isAvailable: false,
      name: "",
      unit: "",
      discount: "",
      isPopular: false,
      image_base: ""
    };
  }

  handleReset = () => {
    this.setState({
      category: "",
      price: "",
      costPrice: "",
      isAvailable: "",
      name: "",
      unit: "",
      discount: "",
      isPopular: ""
    });
  };

  handleSubmit = async () => {
    this.setState({ isLoadingSpinner: true });
    const {
      category,
      price,
      costPrice,
      isAvailable,
      name,
      discount,
      isPopular,
      unit,
      image_base
    } = this.state;
    const obj = {
      category,
      price,
      costPrice,
      isAvailable,
      name,
      discount,
      unit,
      isPopular,
      image_base
    };

    const resp = await Service.Products.addProduct(obj);
    if (resp.data.status === 201) {
      alert("Product added");
    }
    this.setState({ isLoadingSpinner: false }, this.handleReset);
  };

  handleForm = (value, type) => {
    this.setState({
      [type]: value
    });
  };

  render() {
    const {
      category,
      price,
      isAvailable,
      name,
      discount,
      costPrice,
      unit,
      isPopular,
      isLoadingSpinner
    } = this.state;
    return (
      <Row>
        {isLoadingSpinner && <LoadingSpinner />}
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Add</strong> Products
            </CardHeader>
            <CardBody>
              <Form
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label>Date</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <p className="form-control-static">{Utils.getToday()}</p>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Product Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input-1"
                      name="text-input"
                      placeholder="Name"
                      value={name}
                      onChange={e => this.handleForm(e.target.value, "name")}
                    />
                    <FormText color="muted">Name of the product</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Price</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input-2"
                      name="price-input"
                      value={price}
                      placeholder="Enter Price for the product"
                      onChange={e => this.handleForm(e.target.value, "price")}
                    />
                    <FormText className="help-block">
                      Price of the product
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Cost Price</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input-3"
                      name="price-input"
                      value={costPrice}
                      placeholder="Enter Cost Price for the product"
                      onChange={e =>
                        this.handleForm(e.target.value, "costPrice")
                      }
                    />
                    <FormText className="help-block">
                      Cost Price of the product
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Discount (if any)</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input-3"
                      name="price-input"
                      value={discount}
                      placeholder="Enter discount"
                      onChange={e =>
                        this.handleForm(e.target.value, "discount")
                      }
                    />
                    <FormText className="help-block">
                      Discount on Product
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Unit</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input-31"
                      name="price-input"
                      value={unit}
                      placeholder="Enter Unit"
                      onChange={e => this.handleForm(e.target.value, "unit")}
                    />
                    <FormText className="help-block">Unit</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Category</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="select"
                      id="select"
                      value={category}
                      onChange={e =>
                        this.handleForm(e.target.value, "category")
                      }
                    >
                      <option value="vegetables">Vegetable</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Is Popular</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value={isPopular}
                        onChange={e => this.handleForm(!isPopular, "isPopular")}
                        checked={isPopular}
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Is Available?</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox2"
                        name="inline-checkbox2"
                        value={isAvailable}
                        onChange={e =>
                          this.handleForm(!isAvailable, "isAvailable")
                        }
                        checked={isAvailable}
                      />
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <FileBase64
                      onDone={e => this.handleForm(e.base64, "image_base")}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                size="sm"
                color="primary"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-dot-circle-o"></i> Submit
              </Button>
              <Button
                type="reset"
                size="sm"
                color="danger"
                onClick={this.handleReset}
              >
                <i className="fa fa-ban"></i> Reset
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ProductsForm;

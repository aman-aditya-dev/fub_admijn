import React, { Component } from "react";
import Service from "../../../services";
import {
  Button,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
import Utils from "../../../utils";
import FileBase64 from "react-file-base64";

import LoadingSpinner from "../../../common/spinner";

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: "",
      products: [],
      isLoadingSpinner: false
    };
  }

  componentDidMount() {
    const param = Utils.getUrlParam("cat");
    this.setState({ param }, this.getProductsOnCategory);
  }

  getProductsOnCategory = async () => {
    const { param } = this.state;
    this.setState({ isLoadingSpinner: true });
    const resp = await Service.Products.getProducts(param);

    if (resp.data.success === 0) {
      this.setState({ products: resp.data.data });
    }
    this.setState({ isLoadingSpinner: false });
  };

  componentDidUpdate() {
    const currentParam = Utils.getUrlParam("cat");
    const { param } = this.state;
    if (param !== currentParam) {
      this.setState({ param: currentParam }, this.getProductsOnCategory);
    }
  }

  handleInput = (val, index, type) => {
    const { products } = this.state;
    products[index][type] = val;
    this.setState({ products });
  };

  updateProduct = async (id, index) => {
    this.setState({ isLoadingSpinner: true });
    const { products } = this.state;
    const updatedObj = products[index];
    const resp = await Service.Products.updateProducts(id, updatedObj);
    if (resp) this.setState({ isLoadingSpinner: false });
  };

  render() {
    const { param, products, isLoadingSpinner } = this.state;

    return (
      <Row>
        {isLoadingSpinner && <LoadingSpinner />}
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>{" "}
              {param.toLocaleUpperCase()}
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Cost Price</th>
                    <th>Unit</th>
                    <th>Discount</th>
                    <th>IsAvailable</th>
                    <th>IsPopular</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <Input
                          type="text"
                          id="text-input-1"
                          name="text-input"
                          placeholder="Name"
                          value={item.name}
                          onChange={e =>
                            this.handleInput(e.target.value, index, "name")
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          id="text-input-1"
                          name="text-input"
                          placeholder="Price"
                          value={item.price}
                          onChange={e =>
                            this.handleInput(e.target.value, index, "price")
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          id="text-input-1"
                          name="text-input"
                          placeholder="Cost Price"
                          value={item.costPrice}
                          onChange={e =>
                            this.handleInput(e.target.value, index, "costPrice")
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          id="text-input-12"
                          name="text-input"
                          placeholder="Unit"
                          value={item.unit}
                          onChange={e =>
                            this.handleInput(e.target.value, index, "unit")
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          id="text-input-1"
                          name="text-input"
                          placeholder="Discount"
                          value={item.discount}
                          onChange={e =>
                            this.handleInput(e.target.value, index, "discount")
                          }
                        />
                      </td>
                      <td>
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="inline-checkbox1"
                            name="inline-checkbox1"
                            value={item.isAvailable}
                            checked={item.isAvailable}
                            onChange={e =>
                              this.handleInput(
                                !item.isAvailable,
                                index,
                                "isAvailable"
                              )
                            }
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="inline-checkbox1"
                            name="inline-checkbox1"
                            value={item.isPopular}
                            checked={item.isPopular}
                            onChange={e =>
                              this.handleInput(
                                !item.isPopular,
                                index,
                                "isPopular"
                              )
                            }
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <img src={item.image_base} width="50px" height="50px" />
                        <FileBase64
                          onDone={e =>
                            this.handleInput(e.base64, index, "image_base")
                          }
                        />
                      </td>
                      <td>
                        <Button
                          type="submit"
                          size="sm"
                          color="primary"
                          onClick={() => this.updateProduct(item._id, index)}
                        >
                          <i className="fa fa-dot-circle-o"></i> Update
                        </Button>
                        {/* <Button type="reset" size="sm" color="danger">
                          <i className="fa fa-ban"></i> Reset
                        </Button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem>
                  <PaginationLink previous tag="button"></PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next tag="button"></PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ProductListing;

import axios from "axios";

class Service {
  static api() {
    const now = new Date().getTime();
    const o = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json"
      }
    });

    o.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        console.log("error");
      }
    );

    return o;
  }

  static User = class {
    static async getAllUsers() {
      return await Service.api().get(`/allUserss`, null, {});
    }

    static async getUser() {
      return await Service.api().get(`/`, null, {});
    }

    static async login(username, password) {
      return await Service.api().get(
        `/login/${username}/${password}`,
        null,
        {}
      );
    }
  };

  static Products = class {
    static async addProduct(obj) {
      return await Service.api().post(`/addProducts`, null, {
        data: { ...obj }
      });
    }

    static async getProducts(category) {
      console.log("category", category);
      return await Service.api().get(
        `/getProductOnCategory/${category}`,
        null,
        {}
      );
    }

    static async getPopularProducts() {
      return await Service.api().get(`/popularProducts`, null, {
        param: {}
      });
    }

    static async updateProducts(id, updatedObj) {
      console.log("updatedObj", updatedObj);
      return await Service.api().put(`/updateProducts/${id}`, null, {
        data: { ...updatedObj }
      });
    }
  };
}

export default Service;

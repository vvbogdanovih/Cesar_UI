import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../ApiAdres";
import Header from "../Main/Header/Header";
import Footer from "../Main/Footer/Footer";

interface Route {
  id?: string;
  adres: string;
  gpu?: string;
  cpu?: string;
}
const getRoleFromJWT = (jwtToken: any) => {
  // Розділіть токен на частини (header, payload, signature)
  const parts = jwtToken.split(".");

  // Перевірте, що токен має три частини
  if (parts.length !== 3) {
    throw new Error("Неправильний формат токена");
  }

  // Розпарсьте payload з другого компонента токена (base64)
  const payload = parts[1];
  const decodedPayload = atob(payload);

  // Перетворіть розпарсене значення з JSON-формату
  const payloadObject = JSON.parse(decodedPayload);

  // Отримайте роль з payload, використовуючи ключ, зазначений у вашому прикладі
  const roleKey =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const role = payloadObject[roleKey];

  // Поверніть роль
  return role;
};

// Приклад використання стрілочної функції
const jwtToken = localStorage.getItem("Token");

const Admin = () => {
  const navigate = useNavigate();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [newRoute, setNewRoute] = useState<Route>({
    id: "",
    adres: "",
    gpu: "",
    cpu: "",
  });
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  // Функція для отримання всіх маршрутів
  const fetchAllRoutes = async () => {
    try {
      const response = await axios.get<Route[]>(`${api}/Route/GetAllRoutes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Вкажіть тип вмісту
        },
      }); // Замініть URL на ваш
      setRoutes(response.data);
    } catch (error) {
      console.error("Помилка отримання маршрутів", error);
    }
  };

  // Функція для додавання нового маршруту
  const delRoute = async (a: Route) => {
    try {
      await axios.post(`${api}/Route/DeleteRoutes`, a, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Вкажіть тип вмісту
        },
      });
      fetchAllRoutes(); // Оновити список маршрутів
    } catch (error) {
      console.error("Помилка додавання маршруту", error);
    }
  };
  // Функція для додавання нового маршруту
  const addRoute = async () => {
    try {
      await axios.post(`${api}/Route/AddRoutes`, newRoute, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`, // Вкажіть тип вмісту
        },
      });
      fetchAllRoutes(); // Оновити список маршрутів
      setNewRoute({ adres: "", gpu: "", cpu: "" }); // Очистити форму
    } catch (error) {
      console.error("Помилка додавання маршруту", error);
    }
  };

  // Функція для редагування маршруту
  const editRoute = async () => {
    if (editingRoute) {
      console.log(editingRoute);
      try {
        await axios.post(`${api}/Route/EditRoutes`, editingRoute, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`, // Вкажіть тип вмісту
          },
        });
        fetchAllRoutes(); // Оновити список маршрутів
        setEditingRoute(null); // Завершити редагування
      } catch (error) {
        console.error("Помилка редагування маршруту", error);
      }
    }
  };

  // Виклик функції для отримання всіх маршрутів під час першого рендеру
  useEffect(() => {
    const userRole = getRoleFromJWT(jwtToken);
    if (userRole == "User") {
      alert("Ви не ваторизовані як Admin чи Moderator");
      navigate("/logination");
    }
    fetchAllRoutes();
  }, []);

  return (
    <div>
      <Header />
      {getRoleFromJWT(jwtToken) != "User" && (
        <div className="admin">
          <div className="center-element">
            <h2 className="h2">Таблиця маршрутів</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th className="td-guid">ID</th>
                <th className="td-adres">Адреса</th>
                <th className="td-cpu-gpu">GPU</th>
                <th className="td-cpu-gpu">CPU</th>
                <th className="td-action">Дії</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td>
                    <div className="center-element">{route.id}</div>
                  </td>
                  <td>
                    <div className="center-element">{route.adres}</div>
                  </td>
                  <td>
                    <div className="center-element">{route.gpu}</div>
                  </td>
                  <td>
                    <div className="center-element">{route.cpu}</div>
                  </td>
                  <td>
                    <div className="center-element">
                      <button
                        className="button"
                        onClick={() => setEditingRoute(route)}
                      >
                        Редагувати
                      </button>
                      <button
                        className="button"
                        onClick={() => delRoute(route)}
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="center-element">
            <h2 className="h2">Додати новий маршрут</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addRoute();
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Адреса</th>
                  <th>GPU</th>
                  <th>CPU</th>
                  <th className="td-action">Дії</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  <div className="center-element">
                    <input
                      className="input"
                      type="text"
                      placeholder="Адреса"
                      value={newRoute.adres}
                      onChange={(e) =>
                        setNewRoute({ ...newRoute, adres: e.target.value })
                      }
                      required
                    />
                  </div>
                </td>
                <td>
                  <div className="center-element">
                    <input
                      className="input"
                      type="text"
                      placeholder="GPU"
                      value={newRoute.gpu}
                      onChange={(e) =>
                        setNewRoute({ ...newRoute, gpu: e.target.value })
                      }
                      required
                    />
                  </div>
                </td>
                <td>
                  <div className="center-element">
                    <input
                      className="input"
                      type="text"
                      placeholder="CPU"
                      value={newRoute.cpu}
                      onChange={(e) =>
                        setNewRoute({ ...newRoute, cpu: e.target.value })
                      }
                      required
                    />
                  </div>
                </td>
                <td>
                  <div className="center-element">
                    <button className="button" type="submit">
                      Додати
                    </button>
                  </div>
                </td>
              </tbody>
            </table>
          </form>

          {editingRoute && (
            <div>
              <div className="center-element">
                <h2 className="h2">Редагувати маршрут</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editRoute();
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th className="td-guid">ID</th>
                      <th className="td-adres">Адреса</th>
                      <th className="td-cpu-gpu">GPU</th>
                      <th childrentd-cpu-gpu>CPU</th>
                      <th className="td-action">Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>
                      <div className="center-element">{editingRoute.id}</div>
                    </td>
                    <td>
                      <div className="center-element">
                        <input
                          className="input"
                          type="text"
                          value={editingRoute.adres}
                          onChange={(e) =>
                            setEditingRoute({
                              ...editingRoute,
                              adres: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </td>
                    <td>
                      <div className="center-element">
                        <input
                          className="input"
                          type="text"
                          value={editingRoute.gpu}
                          onChange={(e) =>
                            setEditingRoute({
                              ...editingRoute,
                              gpu: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </td>
                    <td>
                      <div className="center-element">
                        <input
                          className="input"
                          type="text"
                          value={editingRoute.cpu}
                          onChange={(e) =>
                            setEditingRoute({
                              ...editingRoute,
                              cpu: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </td>
                    <td>
                      <div className="center-element">
                        <button className="button" type="submit">
                          Зберегти
                        </button>
                        <button
                          className="button"
                          type="button"
                          onClick={() => setEditingRoute(null)}
                        >
                          Скасувати
                        </button>
                      </div>
                    </td>
                  </tbody>
                </table>
              </form>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};
export default Admin;

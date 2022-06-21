import React, { Fragment, useEffect } from "react";
import "./myOrders.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/actions/orderAction";
import Loader from "../common/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../common/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <h2>MY ORDER</h2>
          <Table>
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Status</Th>
                <Th>Items Qty</Th>
                <Th>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            {orders &&
              orders.map((item) => (
                <Tbody key={item._id}>
                  <Tr>
                    <Td>{item._id}</Td>
                    <Td
                      style={{
                        color: `${
                          item.orderStatus === "Delivered" ? "green" : "red"
                        }`,
                      }}
                    >
                      {item.orderStatus}
                    </Td>
                    <Td>{item.orderItems.length}</Td>
                    <Td>{item.totalPrice}</Td>
                    <Td>
                      <Link to={`/order/${item._id}`}>
                        <LaunchIcon />
                      </Link>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;

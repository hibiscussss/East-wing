import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Center,
  Spinner,
  Image,
  Stack,
  Badge,
  Flex,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchOrders, deleteOrder } from "../../../api";
import { FiTrash2 } from "react-icons/fi";
import Swal from 'sweetalert2';
import './Orders.css';

function Orders() {
  const { isLoading, isError, data, error } = useQuery("admin:orders", fetchOrders);
  const queryClient = useQueryClient();
  const toast = useToast();

  // Delete mutation
  const deleteMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin:orders");
      
      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Deleted!',
        text: 'Order has been successfully deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff4444',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
          popup: 'custom-modal-popup',
          title: 'custom-modal-title',
          content: 'custom-modal-content',
          confirmButton: 'custom-modal-button'
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    },
    onError: (error) => {
      console.error("Delete Error:", error);
      // Show error message with SweetAlert2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the order.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff4444',
        background: '#1a1a1a',
        color: '#ffffff',
        customClass: {
          popup: 'custom-modal-popup',
          title: 'custom-modal-title',
          content: 'custom-modal-content',
          confirmButton: 'custom-modal-button'
        }
      });
    }
  });

  const handleDelete = (orderId) => {
    console.log("Attempting to delete order:", orderId);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4444',
      cancelButtonColor: '#2d2d2d',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#ffffff',
      customClass: {
        popup: 'custom-modal-popup',
        title: 'custom-modal-title',
        content: 'custom-modal-content',
        confirmButton: 'custom-modal-button',
        cancelButton: 'custom-modal-button-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteMutation.mutate(orderId);
        } catch (error) {
          console.error("Error in delete handler:", error);
        }
      }
    });
  };

  // First, add a function to calculate total cost
  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <Center><Spinner size="xl" color="#ff4444" /></Center>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="admin-container">
        <Text color="red.500">Error: {error.message}</Text>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-links">
          <li><Link to="/admin" className="nav-link">Home</Link></li>
          <li><Link to="/admin/orders" className="nav-link active">Orders</Link></li>
          <li><Link to="/admin/products" className="nav-link">Products</Link></li>
        </ul>
      </nav>

      <Box className="orders-content-wrapper">
        <Box className="orders-table-container">
          <Text className="page-title">Orders</Text>

          {!data || data.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">📦</div>
              <Text className="no-orders-text">No orders available</Text>
              <Text className="no-orders-subtext">Orders will appear here once customers make purchases</Text>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <Table variant="simple" className="admin-table">
                <TableCaption>Orders Overview</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Users</Th>
                    <Th>Address</Th>
                    <Th>Order Details</Th>
                    <Th>Total Items</Th>
                    <Th>Total Cost</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((order) => (
                    <Tr key={order._id}>
                      <Td>{order.user?.email || "No Name"}</Td>
                      <Td>{order.address || "No address available"}</Td>
                      <Td>
                        <Stack spacing={2}>
                          {order.items.map((item, index) => (
                            <Box key={index} className="order-item">
                              <Flex align="center" gap={3}>
                                {item.photos && item.photos[0] && (
                                  <Image
                                    src={item.photos[0]}
                                    alt={item.title}
                                    boxSize="50px"
                                    objectFit="cover"
                                    borderRadius="md"
                                  />
                                )}
                                <Stack spacing={0}>
                                  <Text fontWeight="medium">{item.title}</Text>
                                  <Text color="gray.500" fontSize="sm">
                                    ₱{item.price}
                                  </Text>
                                </Stack>
                              </Flex>
                            </Box>
                          ))}
                        </Stack>
                      </Td>
                      <Td>
                        <Badge colorScheme="orange" borderRadius="full" px={2}>
                          {order.items.length} items
                        </Badge>
                      </Td>
                      <Td>
                        <Text color="green.400" fontWeight="bold">
                          ₱{calculateOrderTotal(order.items).toFixed(2)}
                        </Text>
                      </Td>
                      <Td>
                        <IconButton
                          icon={<FiTrash2 />}
                          aria-label="Delete order"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDelete(order._id)}
                          className="delete-button"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Orders;

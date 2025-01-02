import React, { useState, useRef } from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
  Box,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
// Remove or comment out the App.css import
// import "../../App.css";

// Add this import instead
import "./Card.css";
import Swal from 'sweetalert2';
import { postOrder } from "../../api.js";

function CoffeeShopCard({ item }) {
  const { addToBasket, items } = useBasket();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const initialRef = useRef();
  const toast = useToast(); // Initialize toast

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  const handleRating = (e, value) => {
    e.preventDefault();
    setRating(value);
    
    // Show an aesthetically pleasing modal for rating confirmation
    toast({
      position: 'top',
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box
          color='white'
          p={4}
          bg='rgba(0, 0, 0, 0.8)'
          borderRadius='lg'
          boxShadow='2xl'
          backdropFilter='blur(10px)'
        >
          <Stack spacing={3} align='center'>
            <Text fontSize='lg' fontWeight='bold'>
              Rating Submitted
            </Text>
            <Box display='flex' alignItems='center' gap={1}>
              {[...Array(value)].map((_, i) => (
                <StarIcon key={i} color='yellow.400' />
              ))}
            </Box>
            <Text>
              Thank you for rating this product!
            </Text>
          </Stack>
        </Box>
      )
    });
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleBuyNowClick = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to proceed with the purchase.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = async () => {
    if (!address) {
      toast({
        title: "Address is required.",
        description: "Please provide a valid address to proceed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create order input with single item
    const input = {
      address,
      items: JSON.stringify([item._id]),
    };

    try {
      const response = await postOrder(input);
      
      // Close modal
      setIsModalOpen(false);
      
      // Show sweet alert for success
      Swal.fire({
        title: 'Order Successful!',
        text: 'Your order has been successfully placed.',
        icon: 'success',
        confirmButtonText: 'Continue Shopping',
        confirmButtonColor: '#ff4444',
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
          popup: 'custom-modal-popup',
          title: 'custom-modal-title',
          content: 'custom-modal-content',
          confirmButton: 'custom-modal-button',
        },
        background: '#1a1a1a',
        color: '#ffffff',
        iconColor: '#ff4444',
        backdrop: `
          rgba(0,0,0,0.8)
          left top
          no-repeat
        `
      });
      
    } catch (error) {
      console.error("Error placing order:", error);
      setIsModalOpen(false);
      
      // Show sweet alert for error
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while placing your order.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ff4444',
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
          popup: 'custom-modal-popup',
          title: 'custom-modal-title',
          content: 'custom-modal-content',
          confirmButton: 'custom-modal-button',
        },
        background: '#1a1a1a',
        color: '#ffffff',
        iconColor: '#ff4444',
        backdrop: `
          rgba(0,0,0,0.8)
          left top
          no-repeat
        `
      });
    }
  };

  return (
    <>
      <Card id="menu" className="cardContainer">
        <Link to={`/product/${item._id}`}>
          <CardBody p={5}>
            <Box position="relative">
              <Text className="card-date">
                {moment(item.createdAt).format("MMM DD, YYYY")}
              </Text>
              <Image
                src={item.photos[0]}
                alt={item.title}
                className="cardImage"
                loading="lazy"
                boxSize={300}
                objectFit="cover"
                mb={4}
              />
              {item.isNew && <Badge className="badge">New</Badge>}
            </Box>
            <Stack spacing="3" align="center" textAlign="center">
              <Heading className="cardHeading">{item.title}</Heading>
              
              <Text className="card-description">
                {item.description}
              </Text>
              {/* The Star rating inside the card 


              <Box display="flex" justifyContent="center" mb={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    color={(hoverRating || rating) >= star ? "orange.400" : "gray.300"}
                    cursor="pointer"
                    boxSize={5}
                    mx={0.5}
                    onClick={(e) => handleRating(e, star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </Box>
                                            */}
              <Text className="cardPrice">₱{item.price.toFixed(2)}</Text>
            </Stack>
          </CardBody>
        </Link>

        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" w="full">
            {user?.role === "admin" ? (
              <>
                {/* Show "Edit" button for admins */}
                <Button
                  colorScheme="blue"
                  variant="solid"
                  as={Link}
                  to={`/admin/products/${item._id}`} // Directs to the specific admin product detail page
                  w="full"
                  className="cardButton"
                >
                  Edit
                </Button>
                {/* Show "Add to Cart" button for admins */}
                <Button
                  colorScheme={findBasketItem ? "teal" : "orange"}
                  variant="solid"
                  onClick={() => addToBasket(item, findBasketItem)}
                  w="full"
                  className="cardButton"
                >
                  {findBasketItem ? "Remove" : "Add to Cart"}
                </Button>
              </>
            ) : user ? (
              // Show "Add to Cart" button for regular logged-in users
              <>
                <Button
                  colorScheme={findBasketItem ? "teal" : "orange"}
                  variant="solid"
                  onClick={() => addToBasket(item, findBasketItem)}
                  w="full"
                  className="cardButton"
                >
                  {findBasketItem ? "Remove" : "Add to Cart"}
                </Button>
                {/* Show "Buy Now" button for regular users */}
                <Button
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleBuyNowClick}
                  w="full"
                  className="cardButton"
                >
                  Buy Now
                </Button>
              </>
            ) : (
              // Show "Sign Up" button for logged-out users
              <>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  as={Link}
                  to="/signup" // Redirects to the signup page
                  w="full"
                  className="cardButton"
                >
                  Sign Up now!
                </Button>
                {/* Show "Buy Now" button for logged-out users */}
                <Button
                  colorScheme="orange"
                  variant="solid"
                  onClick={handleBuyNowClick}
                  w="full"
                  className="cardButton"
                >
                  Buy Now
                </Button>
              </>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Modal 
        initialFocusRef={initialRef} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        className="checkout-modal"
      >
        <ModalOverlay className="modal-overlay" />
        <ModalContent className="modal-content">
          <ModalHeader className="modal-header">
            Checkout
          </ModalHeader>
          <ModalCloseButton className="modal-close" />

          <ModalBody className="modal-body">
            <div className="order-summary">
              <Text className="summary-title">Order Summary</Text>
              <div className="summary-details">
                <Text>Item (1)</Text>
                <Text>₱{item.price}</Text>
              </div>
            </div>

            <FormControl isRequired>
              <FormLabel className="address-label">
                Delivery Address
              </FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Enter your complete delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="address-input"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className="modal-footer">
            <Button
              onClick={handleSubmitForm}
              className="place-order-btn"
            >
              Place Order • ₱{item.price}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CoffeeShopCard;

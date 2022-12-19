import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, SetName] = useState("");
    const [address, SetAddress] = useState("");
    const [email, Setemail] = useState("");
    const [password, Setpassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/login";
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ name, address, email, password });
      const url = process.env.REACT_APP_BASE_URL
      console.log(url)
      fetch(`https://skin-care-hub.onrender.com/signup`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          navigate(redirectPath, { replace: true });
        })
        .catch((err) => console.log(err));
    };
    // name,{email,password},age,gender,phonenumber,address(opt)
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="#F1F6F5">
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontWeight={350} fontSize={"4xl"} textAlign={"center"}>
              About You
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign Up to enjoy all of our cool features
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => SetName(e.target.value)}
                />
              </FormControl>
  
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Input
                  required
                  placeholder="Address"
                  type="text"
                  onChange={(e) => SetAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => Setemail(e.target.value)}
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" type="number" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    required
                    onChange={(e) => Setpassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  fontWeight="600"
                  bgColor="black"
                  size="lg"
                  color="white"
                  borderRadius="0"
                  _hover={{
                    bg: "cyan.500"
                  }}
                  onClick={handleSubmit}
                >
                  SIGN UP
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to="/login">
                    <Text color={"blue.400"}> Login</Text>
                  </Link>
                </Text>
                <Text align={"center"}>
                  By proceeding, you are confirming that you agree to our{" "}
                  <strong>Terms and Conditions</strong> and{" "}
                  <strong>Privacy Policy</strong>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  
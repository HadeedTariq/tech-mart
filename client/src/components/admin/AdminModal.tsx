import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAdminPassword } from "../../store/reducers/adminReducer";
import { useNavigate } from "react-router-dom";

const AdminModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalContent bg={"slateblue"} margin={"0"}>
          <ModalHeader className="font-Martian">Admin Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              ref={passwordRef}
              type="password"
              className="text-white bg-transparent outline-none border-2 w-full rounded-md p-1 text-[18px]"
            />
          </ModalBody>
          <ModalFooter>
            <button
              className="bg-purple-600 font-Lato font-bold rounded-md py-1 px-4 text-[18px]"
              onClick={() => {
                dispatch(setAdminPassword(passwordRef.current?.value));
                navigate("/admin");
              }}>
              Enter
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminModal;

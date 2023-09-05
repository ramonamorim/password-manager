import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Card } from "../model/model";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

type CardModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cardForm: Card;
  setCardForm: (value: Card) => void;
  persistCard: (value: Card) => Promise<void>;
  isEdit: boolean;
  deleteCard: () => Promise<void>;
};

export default function CardModal(props: CardModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onChangeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setCardForm({
      ...props.cardForm,
      [event.target.name]: event.target.value,
    });
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.persistCard(props.cardForm);
  };

  const copyToClipBoard = async () => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(props.cardForm.password);
    } else {
      return document.execCommand("copy", true, props.cardForm.password);
    }
  };

  console.log(props.isEdit);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          props.setOpen(false);
          setShowPassword(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Store new Password
          </Typography>
          <form onSubmit={onFormSubmit}>
            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <InputLabel>URL</InputLabel>
              <OutlinedInput
                label="URL"
                name="url"
                onChange={onChangeForm}
                value={props.cardForm.url}
                required
              />
            </FormControl>

            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                label="Name"
                name="name"
                onChange={onChangeForm}
                value={props.cardForm.name}
                required
              />
            </FormControl>

            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <InputLabel>Username</InputLabel>
              <OutlinedInput
                label="Username"
                name="username"
                onChange={onChangeForm}
                value={props.cardForm.username}
                required
              />
            </FormControl>

            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={onChangeForm}
                value={props.cardForm.password}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton
                      aria-label="copy to clip board"
                      edge="end"
                      style={{ marginLeft: "0.6rem" }}
                      onClick={() => copyToClipBoard()}
                    >
                      <ContentCopyIcon />{" "}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
              <Button
                color="info"
                variant="contained"
                onClick={() => {
                  props.setOpen(false);
                  setShowPassword(false);
                }}
              >
                Cancel
              </Button>
            </FormControl>
            {props.isEdit && (
              <FormControl fullWidth style={{ marginTop: "0.8rem" }}>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => props.deleteCard()}
                >
                  Delete
                </Button>
              </FormControl>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

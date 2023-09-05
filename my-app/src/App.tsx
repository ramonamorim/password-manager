import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SearchAppBar from "./component/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import CardPassword from "./component/Card";
import { useState, useEffect } from "react";
import { cardService } from "./service/cardservice";
import { Card } from "./model/model";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardModal from "./component/CardModal";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cardForm, setCardForm] = useState<Card>({
    url: "",
    name: "",
    username: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [searchCard, setSearchCard] = useState<String>("");

  const deleteCard = async () => {
    if (cardForm.id) {
      await cardService.deleteCard(cardForm.id);
      setOpenModal(false);
      setIsEdit(false);
      cleanCardForm();
      await listAllCards();
    }
  };

  const listAllCards = async () => {
    try {
      const result = await cardService.findAllCards(searchCard);
      setCards(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listAllCards();
  }, [searchCard]);

  const openModalCreate = async () => {
    setOpenModal(true);
  };

  const cleanCardForm = () => {
    setCardForm({
      url: "",
      name: "",
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (!openModal) {
      setIsEdit(false);
    }
  }, [openModal]);

  const openModalEdit = (id: Number) => {
    const card = cards.find((c) => c.id === id);
    if (card) {
      setIsEdit(true);
      setCardForm({
        id: card.id,
        url: card?.url,
        name: card?.name,
        username: card?.username,
        password: card?.password,
      });
      setOpenModal(true);
    }
  };
  const persistCard = async (card: Card) => {
    try {
      await cardService.persistCard(card);
      setOpenModal(false);
      setIsEdit(false);
      cleanCardForm();
      await listAllCards();
    } catch (error) {}
  };

  return (
    <div className="App">
      <CssBaseline />

      <SearchAppBar searchCard={searchCard} setSearchCard={setSearchCard}></SearchAppBar>
      <Container style={{ paddingTop: "1rem" }}>
        <Grid container spacing={2}>
          {cards.map((card) => {
            return (
              <Grid
                xl={3}
                md={6}
                xs={12}
                key={card.id}
                onClick={() => openModalEdit(card.id ? card.id : -1)}
              >
                <CardPassword
                  name={card.name}
                  username={card.username}
                ></CardPassword>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <CardModal
        open={openModal}
        setOpen={setOpenModal}
        cardForm={cardForm}
        setCardForm={setCardForm}
        persistCard={persistCard}
        isEdit={isEdit}
        deleteCard={deleteCard}
      ></CardModal>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={openModalCreate}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default App;

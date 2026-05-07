import "./index.css";

import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoEl = document.querySelector(".header__logo");
  const avatarEl = document.querySelector(".profile__avatar");
  const editIcon = document.querySelector(".profile__edit-button-icon");
  const plusIcon = document.querySelector(".profile__add-button-icon");

  if (logoEl) logoEl.src = logo;
  if (avatarEl) avatarEl.src = avatar;
  if (editIcon) editIcon.src = pencil;
  if (plusIcon) plusIcon.src = plus;
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e2744ce9-21bb-42e1-a7c4-9aad1efaefe4",
    "Content-Type": "application/json",
  },
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const avatarModal = document.querySelector("#avatar-modal");
const deleteModal = document.querySelector("#delete-card-modal");

const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button",
);
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-button");
const deleteCancelBtn = deleteModal.querySelector(
  ".modal__submit-button--cancel",
);
const deleteModalClseBtnMobile = deleteModal.querySelector(
  ".modal__close-button",
);

const editProfileForm = document.forms["editProfileForm"];
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input",
);

const newPostForm = document.forms["newPostForm"];
const newPostLinkInput = document.querySelector("#image-link-input");
const newPostCaptionInput = document.querySelector("#image-caption-input");

const avatarForm = document.forms["editAvatarForm"];
const avatarInput = document.querySelector("#profile-avatar-input");

const deleteForm = document.forms["deleteCardForm"];

const editProfileButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");

const previewImageEl = previewModal.querySelector(".modal__image");
const previewNameEl = previewModal.querySelector(".modal__caption");

let selectedCard, selectedCardId;

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);

      selectedCard = null;
      selectedCardId = null;
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_active");

  api
    .addLike(id, isLiked)
    .then(() => {
      likeButton.classList.toggle("card__like-button_active");
    })
    .catch(console.error);
}

function handleImageClick(data) {
  previewImageEl.src = data.link;
  previewImageEl.alt = data.name;
  previewNameEl.textContent = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  if (data.isLiked) {
    likeBtn.classList.add("card__like-button_active");
  }

  likeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  deleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id),
  );

  cardImageEl.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addCard({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardList.prepend(cardElement);

      newPostForm.reset();
      disableButton(submitBtn, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatarEl.src = data.avatar;

      avatarForm.reset();
      disableButton(submitBtn, settings);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    cards.forEach((item) => {
      cardList.append(getCardElement(item));
    });

    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;
  })
  .catch(console.error);

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );

  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal),
);

newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostCloseButton.addEventListener("click", () => closeModal(newPostModal));
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));
avatarEditButton.addEventListener("click", () => openModal(avatarModal));
avatarCloseBtn.addEventListener("click", () => closeModal(avatarModal));
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));
deleteModalClseBtnMobile.addEventListener("click", () =>
  closeModal(deleteModal),
);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
newPostForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});

import {useState, useRef} from "react";
import "./App.css";

const initialCards = [
  

  {
    className: "card__1",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 1.png",
    alt: "pic__1",
    text: "Val Thorens",
    liked: false
  },
  {
    className: "card__2",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 2.png",
    alt: "pic__2",
    text: "Restaurant terrace",
    liked: false
  },
  {
    className: "card__3",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 3.png",
    alt: "pic__3",
    text: "An outdoor cafe",
    liked: false
  },
  {
    className: "card__4",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 4.png",
    alt: "pic__4",
    text: "A very long bridge, over the forest...",
    liked: false
  },
  {
    className: "card__5",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 5.png",
    alt: "pic__5",
    text: "Tunnel with morning light",
    liked: false
  },
  {
    className: "card__6",
    imageSrc: "assets/pexels-kassandre-pedro-8639743 6.png",
    alt: "pic__6",
    text: "Mountain house",
    liked: false
  },
 
  
];
export default function App() {
  const [profile, setProfile] = useState({
    name: "Bessie Coleman",
    profession: "Civil Aviator",
    avatar: "./assets/Avatar.png",
  });
  const [cards, setCards] = useState(initialCards);
  const [modal, setModal] = useState(null);
  const [preview, setPreview] = useState({ src: "", title: "" });

  const nameRef = useRef();
  const professionRef = useRef();
  const avatarRef = useRef();

  const handleLike = (idx) => {
    setCards((prev) => {
      const updated = [...prev];
      updated[idx].liked = !updated[idx].liked;
      return updated;
    });
  };

  const openEditProfile = () => {
    nameRef.current.value = profile.name;
    professionRef.current.value = profile.profession;
    avatarRef.current.value = "";
    setModal("edit");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const profession = professionRef.current.value.trim();
    if (name.length < 2 || profession.length < 2) return;
    const file = avatarRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ name, profession, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      setProfile({ name, profession, avatar: profile.avatar });
    }
    setModal(null);
  };

  return (
    <div className="App">
      <section className="logo-section">
        <img src="./assets/Logo.svg" alt="Logo" />
      </section>

      <section className="hero-section">
        <div className="hero-img">
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <div className="hero-text">
          <h1>{profile.name}</h1>
          <p>{profile.profession}</p>
          <div className="edit-profile">
            <button className="edit" onClick={openEditProfile}>
              <i className="fa-solid fa-pencil"></i> Edit Profile
            </button>
          </div>
        </div>
        <div className="hero-btn">
          <button className="new-post-btn" onClick={() => setModal("new")}> <i className="fa-solid fa-plus"></i> New Post </button>
        </div>
      </section>
      <hr />
      <main>
        <section className="card-section">
          {cards.map((card, idx) => (
            <div className={`card ${card.className}`} key={idx}>
              <div
                className="card-img-container"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPreview({ src: card.imageSrc, title: card.text });
                  setModal("preview");
                }}
              >
                <img src={card.imageSrc} alt={card.alt} />
              </div>
              <div className="card_text">
                <p>{card.text}</p>
                <i
                  className={`fa-heart ${card.liked ? "fa-solid" : "fa-regular"}`}
                  style={{ color: card.liked ? "red" : "" }}
                  onClick={() => handleLike(idx)}
                ></i>
              </div>
            </div>
          ))}
        </section>
      </main>
      <hr />
      <footer>
        <p>2023 © Spot</p>
      </footer>

      {modal === "edit" && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={() => setModal(null)}>&times;</span>
            <h2>Edit Profile</h2>
            <form onSubmit={saveProfile} autoComplete="off">
              <label>Name</label>
              <input type="text" ref={nameRef} minLength={2} maxLength={30} required />
              <label>Profession</label>
              <input type="text" ref={professionRef} minLength={2} maxLength={30} required />
              <label>Image</label>
              <input type="file" ref={avatarRef} accept="image/*" />
              <button type="submit" className="modal-btn">Save</button>
            </form>
          </div>
        </div>
      )}

      {modal === "preview" && (
        <div className="modal active">
          <div className="modal-content image-preview">
            <span className="close" onClick={() => setModal(null)}>&times;</span>
            <img src={preview.src} alt="Preview" />
            <p>{preview.title}</p>
          </div>
        </div>
      )}

      {modal === "new" && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={() => setModal(null)}>&times;</span>
            <h2>New Post</h2>
            <form autoComplete="off">
              <label>Title</label>
              <input type="text" minLength={2} maxLength={30} required />
              <label>Image</label>
              <input type="file" accept="image/*" required />
              <button type="submit" className="modal-btn">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};




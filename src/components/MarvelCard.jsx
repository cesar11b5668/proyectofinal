import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const MarvelCard = ({ character }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCardClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { name, description, thumbnail, comics } = character;
  const thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <div>
      <div className="card marvel-card" onClick={handleCardClick}>
        <img src={thumbnailUrl} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description || 'No hay descripción disponible'}</p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Personaje"
        className="custom-modal"
        overlayClassName="custom-overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h2>{name}</h2>
          <button onClick={closeModal} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          <img src={thumbnailUrl} alt={name} className="modal-image"/>
          <div className="modal-description">
            <p><strong>Descripción:</strong> {description || 'No hay descripción disponible'}</p>
            <p><strong>Cómics:</strong></p>
            <ul>
              {comics.items.map((comic) => (
                <li key={comic.resourceURI}>{comic.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={closeModal} className="modal-close-button">Cerrar</button>
      </Modal>
    </div>
  );
};

MarvelCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.shape({
      path: PropTypes.string,
      extension: PropTypes.string,
    }),
    comics: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        resourceURI: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default MarvelCard;

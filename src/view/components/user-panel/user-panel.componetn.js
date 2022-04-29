import {useContext, useState} from 'react';
import ContainerContext from '../../contexts/container.context';
import UserContext from '../../contexts/user.context';
import './user-panel.style.css';

//Test data
// {
//   privateKey: 'dfe8cd69229801241ba5d49fd09ab8a3f4603237a8583ec33a8a4166b0f77916',
//   publicKey: 'd4a6039691333d9c640ae842826f73f11c5d4b3f5f5384e95114ab0a18e6b31d',
//   address: 'af1b1499ee6be45b5cb383cd407444ce'
// }

function UserPanel() {
  //contexts
  const {accountService} = useContext(ContainerContext);
  const userContext = useContext(UserContext);

  //state
  const [privateKeyInput, setPrivateKeyInput] = useState('');

  //handlers
  const onClickChangeUserButton = async (event) => {
    const user = await accountService.login({privateKey: privateKeyInput});
    console.log(user); //TODO: remove
    return;
  };

  const onChangePrivateKeyInput = (event) => {
    const value = event.target.value;
    setPrivateKeyInput(value);
  };

  return (
    <div id="user-management" className="flex-column-container">
      <div id="user-management-header">Account</div>
      <div className="flex-row-container">
        <p id="user-management-address" className="text">
          Address: {userContext.address}
        </p>
      </div>
      <div className="flex-row-container">
        <p id="user-management-balance" className="text">
          Balance: {userContext.balance}
        </p>
      </div>
      <div className="flex-row-container">
        <p id="user-management-public" className="text">
          PublicKey: {userContext.publicKey}
        </p>
      </div>
      <div id="user-management-input-private" className="flex-row-container">
        <input
          type="text"
          onChange={onChangePrivateKeyInput}
          placeholder="Enter private key for change account"
        ></input>
        <button onClick={onClickChangeUserButton}>Confirm</button>
      </div>
    </div>
  );
}

export default UserPanel;

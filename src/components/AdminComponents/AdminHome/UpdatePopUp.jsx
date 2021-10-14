import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import DetailConference from "../CreateConferenec/DetailConference";
import axios from "axios";
import BaseUrl from "../../BaseUrl";

const find_conference = BaseUrl.url + "connex/conferenece/find_conference/";

const UpdatePopUp = (props) => {
  const [result, setResult] = useState({});
  const find = true;

  useEffect(() => {
    var data1 = {
      dash_cid: props.value,
    };
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    axios
      .post(find_conference, data1, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        setResult({
          id: response.data.Conference.id,
          ConferenceId: props.value,
          Company: response.data.Conference.dash_company_name,
          Moderator: response.data.Conference.dash_moderator_name,
          StartDate: response.data.Conference.start_date,
          EndDate: response.data.Conference.end_date,
          Series: response.data.Conference.series,
          Branding: response.data.Conference.brand,
          Password: response.data.Conference.password,
          ConfirmPassword: response.data.Conference.password,
          Email1: response.data.Conference.email_addresses[0].email_address,
          Email2: response.data.Conference.email_addresses[1].email_address,
          Email3: response.data.Conference.email_addresses[2].email_address,
        });
      });
  }, [props.value]);

  return (
    <Modal className="classes.UpdateModal">
      <DetailConference
        defaultV={result}
        find={find}
        closeHandle={props.closeHandle}
        popUp="true"
      />
    </Modal>
  );
};

export default UpdatePopUp;

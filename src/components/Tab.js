import { React, useState, useEffect } from "react";
import { CandidateMailingAddresses } from "./CandidateMailingAddress";
import { SourceMailingAddresses } from "./SourceMailingAddress";
import { useFetch } from "../hooks/useFetch";
import { useCandidateMailingAddressStore } from "../stores/useStore";

const TabBoxedContent = ({ id, activeTab, children }) => {
  return activeTab === id ? (
    <div className="TabContent ">{children}</div>
  ) : null;
};

const TabBoxedItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };
  return (
    <li
      onClick={handleClick}
      className={
        activeTab === id
          ? "active  px-2 border-l border-b border-r border-gray-100"
          : ""
      }
    >
      <p className="flex justify-center py-4">{title}</p>
    </li>
  );
};

export const Tab = () => {
  const [activeTab, setActiveTab] = useState("sender-address");
  const [parcels] = useFetch("parcel.json");
  const [candidatesAddresses] = useFetch("candidateAddressList.json");
  const [candidatesAddressId, setCandidateAddressId] = useState("");
  const [displayCandidateAddresses, setDisplayCandidateAddresses] = useState(
    true
  );

  const selectedParcel1 = document.querySelector(".selected-parcel");
  useEffect(() => {
    if (selectedParcel1) {
      setCandidateAddressId(
        selectedParcel1.getAttribute("data-candidate-address-id")
      );
    }
  }, [selectedParcel1]);

  const mailingAddresses = useCandidateMailingAddressStore(
    (state) => state.mailingAddresses
  );
  const getCandidateMailingAddresses = useCandidateMailingAddressStore(
    (state) => state.getCandidateMailingAddresses
  );
  useEffect(() => {
    if (candidatesAddresses) {
      getCandidateMailingAddresses(candidatesAddresses);
    }
  }, [getCandidateMailingAddresses, candidatesAddresses]);

  const handleAssociate = (event) => {
    const selectedParcel = document.querySelector(".selected-parcel");
    if (selectedParcel) {
      const currentAddressId = selectedParcel.getAttribute(
        "data-candidate-address-id"
      );
      if (currentAddressId) {
        const currentMatchAddress = document.getElementById(currentAddressId);
        currentMatchAddress.classList.remove("matched-source");
      }
      selectedParcel.setAttribute(
        "data-candidate-address-id",
        event.currentTarget.parentNode.parentNode.dataset.addressId
      );

      const addressId = selectedParcel.getAttribute(
        "data-candidate-address-id"
      );
      const matchCandidateAddress = document.getElementById(addressId);
      if (matchCandidateAddress) {
        matchCandidateAddress.classList.add("matched-source");
      }

      //setCandidateAddressId(currentAddressId);
      setDisplayCandidateAddresses(true);
      const currentSelectedAddress = document.querySelector(
        `[data-address-id=${event.currentTarget.parentNode.parentNode.dataset.addressId}]`
      );

      const candidateAddressSection = selectedParcel.querySelector(
        ".candidate-address"
      );
      if (
        candidateAddressSection &&
        currentSelectedAddress &&
        document.querySelector(".candidate-hidden-address")
      ) {
        candidateAddressSection.innerHTML = currentSelectedAddress.querySelector(
          ".candidate-hidden-address"
        ).innerHTML;
        selectedParcel.classList.add("has-candidate-address");
      }
    }
  };
  const handleRevoke = () => {
    const selectedParcel = document.querySelector(".selected-parcel");
    if (selectedParcel) {
      const candidateAddressSection = selectedParcel.querySelector(
        ".candidate-address"
      );
      if (candidateAddressSection && candidateAddressSection.length !== 0) {
        const addressId = selectedParcel.getAttribute(
          "data-candidate-address-id"
        );
        const candidateAddressSection = selectedParcel.querySelector(
          ".candidate-address"
        );
        candidateAddressSection.innerHTML = "";
        const matchCandidateAddress = document.getElementById(addressId);
        if (matchCandidateAddress) {
          matchCandidateAddress.classList.remove("matched-source");
        }
        selectedParcel.setAttribute("data-candidate-address-id", "");
        selectedParcel.classList.remove("has-candidate-address");
        setDisplayCandidateAddresses("true");
      }
    }
  };

  const handleParcel = (event) => {
    // 👇️ toggle isSelected state on click
    const parcels = document.querySelectorAll(".parcel");
    parcels.forEach((parcel) => {
      parcel.classList.remove("selected-parcel");
    });

    const matchSources = document.querySelectorAll(".matched-source");
    matchSources.forEach((parcel) => {
      parcel.classList.remove("matched-source");
    });

    event.currentTarget.classList.add("selected-parcel");

    setCandidateAddressId(
      event.currentTarget.getAttribute("data-candidate-address-id")
    );

    const candidateAddress = event.currentTarget.getAttribute(
      "data-candidate-address-id"
    );
    if (candidateAddress) {
      document.getElementById(candidateAddress).classList.add("matched-source");
    }

    setDisplayCandidateAddresses(true);
  };

  return (
    <div className="p-8">
      <ul className="tab-area bg-blue-300 flex text-center text-white  p-1">
        <TabBoxedItem
          title="Sender Address"
          id="sender-address"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabBoxedItem
          title="Receiver Address"
          id="receiver-address"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className="outlet">
        <TabBoxedContent id="sender-address" activeTab={activeTab}>
          <div className="flex flex-wrap">
            <div>
              <SourceMailingAddresses
                sources={parcels}
                handleParcel={handleParcel}
                handleRevoke={handleRevoke}
                currentCandidateAddressId={candidatesAddressId}
              />
            </div>
            {displayCandidateAddresses ? (
              <div className="candidate-address-section mt-6 w-6/12 bg-white shadow border border-gray-100 p-8 text-gray-700 rounded-lg">
                <CandidateMailingAddresses
                  candidates={mailingAddresses}
                  candidateAddressId={candidatesAddressId}
                  handleRevoke={handleRevoke}
                  handleAssociate={handleAssociate}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </TabBoxedContent>
        <TabBoxedContent id="receiver-address" activeTab={activeTab}>
          <h2>Receiver Address</h2>
        </TabBoxedContent>
      </div>
    </div>
  );
};

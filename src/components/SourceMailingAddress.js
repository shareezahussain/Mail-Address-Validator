import { Button } from "@material-ui/core";
import { React } from "react";
import { MatchedCandidateAddressView } from "../components/MatchedCandidateAddress";

export const SourceMailingAddresses = ({
  handleParcel,
  handleRevoke,
  sources,
  currentCandidateAddressId
}) => {
  //const [candidateAddress, setCandidateAddress] = useState([]);

  return (
    <>
      <h2>
        <strong>Sender Addresses </strong>
      </h2>
      {sources &&
        sources.items.map((source, index) => {
          const addressCount = index + 1;
          const {
            candidateAddressId,
            candidateAddressText,
            streetNo,
            streetName,
            streetType,
            city,
            state,
            zipCode
          } = source;
          return (
            <div
              data-candidate-address-id={candidateAddressId}
              key={addressCount}
              className={
                "parcel mb-6" +
                (index === 0 ? " selected-parcel" : "") +
                (candidateAddressId && candidateAddressText
                  ? " has-candidate-address"
                  : "")
              }
              onClick={handleParcel}
            >
              <h2>
                <strong>Address {addressCount} </strong>
                {candidateAddressId &&
                candidateAddressId === currentCandidateAddressId &&
                candidateAddressText ? (
                  <span style={{ color: "blue" }}>Validated</span>
                ) : (
                  ""
                )}
              </h2>

              <div className="flex relative">
                <p>Source Address: </p>
                <p>
                  {streetNo} {streetName} {streetType} {city} {state}
                  {zipCode}
                </p>
                <Button
                  className="revoke-btn"
                  style={{
                    marginLeft: "2rem",
                    marginTop: "-0.5rem",
                    display: "none"
                  }}
                  onClick={handleRevoke}
                >
                  <strong style={{ color: "pink" }}>Revoke</strong>
                </Button>
              </div>

              <div className="flex relative flex-col">
                <p>Candidate Address</p>
                <MatchedCandidateAddressView
                  candidateAddressText={candidateAddressText}
                />

                <p className="validate-msg" style={{ color: "red" }}>
                  Unvalidated
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

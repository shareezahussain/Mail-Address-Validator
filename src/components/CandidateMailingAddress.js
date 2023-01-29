import { Button } from "@material-ui/core";
import { React } from "react";

export const CandidateMailingAddresses = ({
  candidates,
  candidateAddressId,
  handleRevoke,
  handleAssociate
}) => {
  //const [candidateAddress, setCandidateAddress] = useState([]);
  return (
    <>
      <h2>
        <strong>Available Address</strong>
      </h2>
      {candidates &&
        candidates.items.map((candidate, index) => {
          const {
            addressId,
            streetNo,
            streetName,
            streetType,
            city,
            state,
            zipCode
          } = candidate;
          return (
            <>
              <div
                key={index + 2}
                id={addressId}
                data-address-id={addressId}
                className={
                  "mt-10" +
                  (candidateAddressId && candidateAddressId === addressId
                    ? " matched-source"
                    : "")
                }
              >
                <p className="candidate-hidden-address">
                  `{streetNo} {streetName} {streetType} {city}
                  {state}
                  {zipCode}`
                </p>
                <div className="flex relative">
                  <p>
                    <strong>{addressId}</strong>
                  </p>
                  <Button
                    className="revoke-btn"
                    style={{ marginTop: "-0.5rem" }}
                    id="revoke"
                    onClick={handleRevoke}
                  >
                    <strong style={{ color: "pink" }}>Revoke</strong>
                  </Button>
                  <Button
                    className="associate-btn"
                    style={{ marginTop: "-0.5rem" }}
                    id="associate"
                    onClick={handleAssociate}
                  >
                    <strong style={{ color: "blue" }}>Associate</strong>
                  </Button>
                </div>

                <div className="flex relative">
                  <p>Street #:</p>
                  <p data-street-no={streetNo}>{streetNo}</p>
                </div>

                <div className="flex relative">
                  <p>Street Name:</p>
                  <p data-street-name={streetName}>{streetName}</p>
                </div>

                <div className="flex relative">
                  <p>Street Type:</p>
                  <p data-street-type={streetType}>{streetType}</p>
                </div>

                <div className="flex relative">
                  <p>City:</p>
                  <p data-city={city}>{city}</p>
                </div>

                <div className="flex relative">
                  <p>State:</p>
                  <p data-state={state}>{state}</p>
                </div>

                <div className="flex relative">
                  <p>Zip:</p>
                  <p data-zip-code={zipCode}>{zipCode}</p>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

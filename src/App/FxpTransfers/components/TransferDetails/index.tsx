/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import {
  Button,
  ErrorBox,
  Modal,
  FormInput,
  TextField,
  Row,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from 'components';
import { TransferRequestDetailsModal } from './RequestDetailModal';
import { TransferPartyDetailsModal } from './PartyDetailsModal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { TransferDetails } from '../../types';

const stateProps = (state: State) => ({
  model: selectors.getTransferDetails(state),
  transferDetailsError: selectors.getTransferDetailsError(state),
  isTransferDetailsPending: selectors.getIsTransferDetailsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransferDetailsModal()),
});

interface TransferDetailsModalProps {
  model?: TransferDetails;
  transferDetailsError: string | null;
  isTransferDetailsPending: boolean;
  onModalCloseClick: () => void;
}

const TransferDetailsModal: FC<TransferDetailsModalProps> = ({
  model,
  transferDetailsError,
  isTransferDetailsPending,
  onModalCloseClick,
}) => {
  let content = null;

  if (transferDetailsError || !model) {
    content = <ErrorBox>Transfer: Unable to load transfer details</ErrorBox>;
  } else if (isTransferDetailsPending) {
    content = (
      <div className="transfers__transfers__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (model) {
    content = (
      <div className="transfers__transfer__details">
        <TransferDetailsView model={model} />
      </div>
    );
  }

  return (
    <Modal
      id="transferDetails"
      title="Transfer Details"
      width="1000px"
      onClose={onModalCloseClick}
      isSubmitEnabled={false}
    >
      {content}
    </Modal>
  );
};

interface TransferDetailsProps {
  model: TransferDetails;
}

const TransferDetailsView: FC<TransferDetailsProps> = ({ model }) => {
  const [isRequestDetailsVisible, setIsRequestDetailsVisible] = useState(false);
  const [requestModel, setRequestModel] = useState(null);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [isRequestPartyDetailsVisible, setIsRequestPartyDetailsVisible] = useState(false);
  const [partyModel, setPartyModel] = useState(null);
  const [partyModalTitle, setPartyModalTitle] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayeeParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payee Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayerParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payer Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPartyLookupResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Party Lookup Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showConversionError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Conversion Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  let transferStateInput = (
    <FormInput
      disabled={true}
      label="Transfer State"
      value={model.technicalDetails.transferState}
    />
  );

  if (model.technicalDetails.lastError) {
    transferStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Transfer State</label>
          <TextField
            disabled={false}
            label="Transfer State"
            value={model.technicalDetails.transferState}
            onButtonClick={() => showTransferError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  let conversionStateInput = (
    <FormInput
      disabled={true}
      label="Conversion State"
      value={model.technicalDetails.conversionState}
    />
  );

  if (model.technicalDetails.lastError) {
    conversionStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          <label>Conversion State</label>
          <TextField
            disabled={false}
            label="Conversion State"
            value={model.technicalDetails.conversionState}
            onButtonClick={() => showConversionError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Conversion Details</Tab>
          <Tab>Conversion Terms</Tab>
          <Tab>Technical Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Row align="flex-start" 
            style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer ID"
                  type="text"
                  value={model.transferId}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion ID"
                  type="text"
                  value={model.technicalDetails.conversionId}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.transferState}
                />
              </div>
            </Row>

            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Amount"
                  type="text"
                  value={model.sendAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Currency"
                  type="text"
                  value={model.sendCurrency}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Amount"
                  type="text"
                  value={model.receiveAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Currency"
                  type="text"
                  value={model.receiveCurrency}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Submitted"
                  type="text"
                  value={model.conversionSubmitted}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Settlement Batch"
                  type="text"
                  value="N/A"
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Type"
                  type="text"
                  value="Payer DFSP Conversion"
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Institution"
                  type="text"
                  value={model.conversionInstitution}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.technicalDetails.conversionState}
                />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer ID"
                  type="text"
                  value={model.transferTerms.transferId}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.technicalDetails.conversionState}
                />
              </div>
              <div style={{ flex: '0 0 12%', marginRight: '0', maxWidth: '15%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount"
                  type="text"
                  value={model.transferTerms.quoteAmount.amount}
                />
              </div>
              <div style={{ flex: '0 0 1%', marginRight: '5px', maxWidth: '10%' }}>
                <FormInput
                  disabled={true}
                  label=" "
                  type="text"
                  value={model.transferTerms.quoteAmount.currency}
                />
              </div>
              <div style={{ flex: '0 0 20%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount Type"
                  type="text"
                  value={model.transferTerms.quoteAmountType}
                />
              </div>
            </Row>
            <Row align="flex-start stretch">
                
              <div
                style={{
                  width: '50%',
                  marginRight: '10px',
                  marginTop: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Row align="center" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    Conversion Terms
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Transfer Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.transferAmount.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.transferAmount.currency}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Charges
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.charges?.[0].sourceAmount?.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges?.[0].sourceAmount?.currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Charges
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.charges?.[0].targetAmount?.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges?.[0].targetAmount?.currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Exchange Rate
                  </label>
                  <div style={{ marginRight: '0', maxWidth: '30%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.exchangeRate}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Expiry Date Time
                  </label>
                  <div style={{ marginRight: '0', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.expiryDate}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Transfer ID"
                    value={model.transferParties.transferId}
                  />
                </Row>
                
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    id="transfer-details-modal__conversion-id"
                    disabled={true}
                    label="Conversion ID"
                    value={model.technicalDetails.conversionId}
                  />
                </Row>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FormInput
                    id="transfer-details-modal__home-transfer-id"
                    disabled={true}
                    label="Conversion Quote ID"
                    value={model.technicalDetails.conversionQuoteId}
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Conversion State */}
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {conversionStateInput}
                </Row>
              </div>
              <div style={{ alignItems: 'flex-start', flex: '0 0 50%', marginRight: '5px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    View Message Details
                  </label>
                </Row>
                
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.body
                        ) &&
                        'This option is only available when an Fx POST /quote request can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Request</span>
                        </span>
                      }
                      onClick={() => showFxQuoteRequest(model.technicalDetails.fxQuoteRequest)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse
                        ) &&
                        'This option is only available when an fx POST /fxquote response can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Response</span>
                        </span>
                      }
                      onClick={() => showFxQuoteResponse(model.technicalDetails.fxQuoteResponse)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxTransferPrepare &&
                          model.technicalDetails.fxTransferPrepare.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferPrepare &&
                          model.technicalDetails.fxTransferPrepare.body
                        ) &&
                        'This option is only available when an fx POST /transfers prepare can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Transfer Prepare</span>
                        </span>
                      }
                      onClick={() =>
                        showFxTransferPrepare(model.technicalDetails.fxTransferPrepare)
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxTransferFulfilment &&
                          model.technicalDetails.fxTransferFulfilment
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferFulfilment &&
                          model.technicalDetails.fxTransferFulfilment
                        ) &&
                        'This option is only available when a POST /transfers fulfilment can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Transfer Fulfil</span>
                        </span>
                      }
                      onClick={() =>
                        showFxTransferFulfil(model.technicalDetails.fxTransferFulfilment)
                      }
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isRequestDetailsVisible && (
        <TransferRequestDetailsModal
          model={requestModel}
          title={requestModalTitle}
          onCloseClick={() => {
            setIsRequestDetailsVisible(!isRequestDetailsVisible);
          }}
        />
      )}
      {isRequestPartyDetailsVisible && (
        <TransferPartyDetailsModal
          model={partyModel}
          title={partyModalTitle}
          onCloseClick={() => {
            setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
          }}
        />
      )}
    </div>
  );
};

export default connect(stateProps, dispatchProps)(TransferDetailsModal);
import React, { useState, useEffect } from 'react';
import { fetchAccount } from '../../lib/account';
import { Address } from '../Address';
import { Amount } from '../Amount';
import { refreshPrice, STX_USD } from '../../lib/price';
import { useAtom } from 'jotai';
import {} from 'react-jdenticon';
import { CurrentBlockHeight } from '../CurrentBlockHeight';
import { CurrentRewardCycle } from '../CurrentRewardCycle';

export function ProfileFull({ stxAddress, userSession }) {
  const [profileState, setProfileState] = useState({
    account: undefined,
  });

  const [stxUsd, setStxUsd] = useAtom(STX_USD);

  useEffect(() => {
    refreshPrice(setStxUsd);
  }, [setStxUsd]);

  useEffect(() => {
    if (stxAddress) {
      fetchAccount(stxAddress).then(acc => {
        setProfileState({ account: acc });
      });
    }
  }, [stxAddress]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasProfile"
      aria-labelledby="offcanvasProfileLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasProfileLabel">
          <a className="navbar-brand" href="/">
            {stxAddress || typeof stxAddress != 'undefined' ? (
              <svg
                className="rounded-circle bg-white"
                width="50"
                height="50"
                data-jdenticon-value={stxAddress}
              />
            ) : (
              <img src="/stacks.png" width="50" height="50" alt="Logo" />
            )}
          </a>
          {stxAddress ? <Address addr={stxAddress} /> : 'Profile'}{' '}
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="dropdown mt-3">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a
                className="dropdown-item"
                href={'http://miamining.com/history/' + stxAddress}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-box-arrow-up-right"></i> View on MIA Block Explorer
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={'https://explorer.stacks.co/address/' + stxAddress}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-box-arrow-up-right"></i> View Address on Explorer
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="https://github.com/citycoins/citycoin-ui/issues/new?assignees=&labels=Bug&template=bug_report.md&title=%F0%9F%90%9E%5BBUG%5D+"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-bug"></i> Report a Bug
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="https://github.com/citycoins/citycoin-ui/issues/new?assignees=&labels=Enhancement&template=feature_request.md&title=%E2%9A%A1%5BFEAT%5D+"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-lightning"></i> Request a Feature
              </a>
            </li>
            <li>
              <button
                className="dropdown-item"
                href="#"
                onClick={() => {
                  userSession.signUserOut('/');
                }}
              >
                <i className="bi bi-x-circle"></i> Sign Out
              </button>
            </li>
          </ul>
          <hr />
          {profileState.account && (
            <>
              <h5 className="mb-3">Account Balances</h5>
              <Amount ustx={profileState.account.balance} stxAddress={stxAddress} />
            </>
          )}
          <hr />
          <CurrentBlockHeight />
          <CurrentRewardCycle />
        </div>
      </div>{' '}
    </div>
  );
}

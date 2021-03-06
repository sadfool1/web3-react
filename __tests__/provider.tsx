// tslint:disable-next-line: no-implicit-dependencies no-submodule-imports
import 'jest-dom/extend-expect'
import React from 'react'
import { render /* fireEvent, act, waitForElement */ } from 'react-testing-library' // tslint:disable-line: no-implicit-dependencies

import { NetworkOnlyConnector } from '../src/connectors'
import Web3Provider, { useWeb3Context } from '../src/provider'

// TODO mock this out so we're not hitting infura every times
const infura = new NetworkOnlyConnector({
  providerURL: 'https://rinkeby.infura.io/v3/3f0fa5d9c4064d6e8427efac291d66df'
})
const connectors = { infura }

function MyComponent() {
  return (
    <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
      <p data-testid="static-test">test</p>
      <MyChildComponent />
    </Web3Provider>
  )
}

function MyChildComponent() {
  const context = useWeb3Context()

  function setInfura() {
    context.setConnector('infura')
  }

  return (
    <>
      <button data-testid="set-connector" onClick={setInfura} />
      {context.networkId ? <p data-testid="dynamic-networkid">{context.networkId}</p> : null}
    </>
  )
}

test('Rendering', async () => {
  const { getByTestId, queryByTestId } = render(<MyComponent />)

  expect(getByTestId('static-test')).toHaveTextContent('test')
  expect(queryByTestId('dynamic-networkid')).toBeNull()

  // the below tests are commented out until the following issues witbh act() are resolved:
  // https://github.com/kentcdodds/react-testing-library/issues/281
  // https://github.com/facebook/react/issues/14769

  // fireEvent.click(getByTestId('set-connector'))
  // await waitForElement(() => getByTestId('dynamic-networkid'))

  // expect(getByTestId('static-test')).toHaveTextContent('test')
  // expect(getByTestId('dynamic-networkid')).toHaveTextContent('4')
})

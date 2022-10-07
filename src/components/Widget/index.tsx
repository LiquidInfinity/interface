import { Currency, EMPTY_TOKEN_LIST, OnReviewSwapClick, SwapWidget, SwapWidgetSkeleton } from '@uniswap/widgets'
import { useWeb3React } from '@web3-react/core'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { useIsDarkMode } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { GlowByChain } from 'theme/utils'
import { DARK_THEME, LIGHT_THEME } from 'theme/widget'

import { useSyncWidgetInputs } from './inputs'
import { useSyncWidgetSettings } from './settings'
import { useSyncWidgetTransactions } from './transactions'

const WidgetWrapper = styled.div`
  border-radius: 16px;
  ${GlowByChain}
`

export const WIDGET_WIDTH = 360

const WIDGET_ROUTER_URL = 'https://api.uniswap.org/v1/'

export interface WidgetProps {
  defaultToken?: Currency
  onReviewSwapClick?: OnReviewSwapClick
}

export default function Widget({ defaultToken, onReviewSwapClick }: WidgetProps) {
  const locale = useActiveLocale()
  const theme = useIsDarkMode() ? DARK_THEME : LIGHT_THEME
  const { provider } = useWeb3React()

  const { inputs, tokenSelector } = useSyncWidgetInputs(defaultToken)
  const { settings } = useSyncWidgetSettings()
  const { transactions } = useSyncWidgetTransactions()

  return (
    <WidgetWrapper>
      <SwapWidget
        disableBranding
        hideConnectionUI
        // jsonRpcUrlMap is excluded - network providers are always passed directly
        routerUrl={WIDGET_ROUTER_URL}
        width={WIDGET_WIDTH}
        locale={locale}
        theme={theme}
        onReviewSwapClick={onReviewSwapClick}
        // defaultChainId is excluded - it is always inferred from the passed provider
        provider={provider}
        tokenList={EMPTY_TOKEN_LIST} // prevents loading the default token list, as we use our own token selector UI
        {...inputs}
        {...settings}
        {...transactions}
      />
      {tokenSelector}
    </WidgetWrapper>
  )
}

export function WidgetSkeleton() {
  return <SwapWidgetSkeleton theme={useIsDarkMode() ? DARK_THEME : LIGHT_THEME} width={WIDGET_WIDTH} />
}

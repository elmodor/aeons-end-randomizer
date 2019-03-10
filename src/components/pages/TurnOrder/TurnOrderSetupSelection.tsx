import React, { useState } from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'

import useExpansionHandling from '../../../hooks/useExpansionHandling'
import config from '../../../config'
import {
  ITurnOrderSetup
} from '../../../config/types'

import StyledExpansionPanel from '../../StyledExpansionPanel'
import StyledExpansionPanelSummary from '../../StyledExpansionPanelSummary'
import ShuffleButton from '../../ShuffleButton'

import turnOrderStyles from './turnOrderStyles'

const renderSetupOptions = () => Object.values(config.TURNORDERSETUPS).map(setup => (
  <FormControlLabel
    key={setup.id}
    value={setup.id}
    control={<Radio />}
    label={setup.name}
  />
))

const renderCardNames = (turnOrderSetup: ITurnOrderSetup) => turnOrderSetup
  .turnOrderCards
  .map(
    (card, i) => (
      <Typography component='p' key={i}>
        {card.name}
      </Typography>
    )
  )

const TurnOrderSetupSelection = React.memo(({
  turnOrderSetup,
  startGame,
  chooseSetup,
  classes
}: {
  turnOrderSetup: ITurnOrderSetup,
  startGame: () => void,
  chooseSetup: (setupId: string, mode: string) => void,
  classes: any
}) => {
  const [ turnOrderMode, setTurnOrderMode ] = useState("Default")
  const { expanded, handleExpansion, setExpanded } = useExpansionHandling()
  const handleSetupChange = (setupId: string, mode: string) => {
    setTurnOrderMode(mode)
    chooseSetup(setupId, mode)
    setExpanded(false)
  }

  return (
    <React.Fragment>
      <StyledExpansionPanel expanded={expanded === 'setup'} onChange={handleExpansion('setup')}>
        <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{turnOrderSetup.name}</Typography>
        </StyledExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RadioGroup
            aria-label='Players'
            name='turnOrderOptions'
            value={turnOrderSetup.id}
            onChange={
              (event: React.ChangeEvent<any>) => handleSetupChange(event.currentTarget.value, turnOrderMode)
            }
          >
            {renderSetupOptions()}
          </RadioGroup>
        </ExpansionPanelDetails>
      </StyledExpansionPanel>
      <Card className={classes.cardDeck}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Mode</Typography>
          <RadioGroup
            aria-label='mode'
            name='turnOrderMode'
            value={turnOrderMode}
            onChange={
              (event: React.ChangeEvent<any>) => handleSetupChange(turnOrderSetup.id, event.currentTarget.value)
            }
          >
            <FormControlLabel
              key="Default"
              value="Default"
              control={<Radio />}
              label="Default"
            />
            <FormControlLabel
              key="Maelstrom"
              value="Maelstrom"
              control={<Radio />}
              label="Maelstrom"
            />
          </RadioGroup>
        </CardContent>
      </Card>
      <Card className={classes.cardDeck}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Turn order cards</Typography>
          { renderCardNames(turnOrderSetup) }
        </CardContent>
      </Card>
      <ShuffleButton color='primary' variant='extended' onClick={startGame}>
        Start Game
      </ShuffleButton>
    </React.Fragment>
  )
})

export default withStyles(turnOrderStyles)(TurnOrderSetupSelection)
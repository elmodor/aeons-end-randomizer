import { createSelector } from 'reselect'

import { RootState } from 'Redux/Store/'

const getExpeditions = (state: RootState) =>
  state.Expeditions.Expeditions.expeditions
const getExpeditionIds = (state: RootState) =>
  state.Expeditions.Expeditions.expeditionIds
const getExpeditionId = (_: RootState, props: { expeditionId: string }) =>
  props.expeditionId
const getBattleId = (_: RootState, props: { battleId: string }) =>
  props.battleId

const getExpeditionList = createSelector(
  [getExpeditionIds, getExpeditions],
  (ids, expeditions) => ids.map(id => expeditions[id])
)

const getExpeditionById = createSelector(
  [getExpeditions, getExpeditionId],
  (expeditions, id) => expeditions[id]
)

const getExpeditionIsFinished = createSelector(
  [getExpeditionById],
  expedition => expedition.finished
)

const getHasNextBattle = createSelector(
  [getExpeditionById, getBattleId],
  (expedition, battleId) => {
    const currentBattleIndex = expedition.battles.findIndex(
      battle => battle.id === battleId
    )

    return currentBattleIndex + 1 < expedition.battles.length
  }
)

const getNextBattle = createSelector(
  [getExpeditionById, getBattleId],
  (expedition, battleId) => {
    const currentBattleIndex = expedition.battles.findIndex(
      battle => battle.id === battleId
    )
    const hasNext = currentBattleIndex < expedition.battles.length

    if (hasNext) {
      return expedition.battles[currentBattleIndex + 1]
    }

    return null
  }
)

const getSupplyByExpeditionId = createSelector(
  [getExpeditionById],
  expedition => expedition.barracks.supplyIds
)

const getMagesByExpeditionId = createSelector(
  [getExpeditionById],
  expedition => expedition.barracks.mageIds
)

export const selectors = {
  getExpeditions,
  getExpeditionIds,
  getExpeditionList,
  getExpeditionById,
  getNextBattle,
  getSupplyByExpeditionId,
  getMagesByExpeditionId,
  getExpeditionIsFinished,
  getHasNextBattle,
}
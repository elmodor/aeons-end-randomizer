import * as types from 'aer-types'
import { RootState } from 'Redux/Store'

export const migrateToExpeditionDSL = (
  _: RootState,
  expedition: types.OldStyleExpedition
) => {
  const { battles, ...expeditionProps } = expedition

  const bigPocketVariantConfig = expeditionProps.bigPocketVariant

  return {
    ...expeditionProps,
    bigPocketVariantConfig,
    sequence: {
      firstBranchId: battles[0].id,
      branches: battles.reduce((acc, battle, index) => {
        const { nemesisTier, treasure, ...battleProps } = battle

        return {
          ...acc,
          [battle.id]: {
            ...battleProps,
            nextBranchId: battles[index + 1]?.id,
            type: 'battle',
            config: {
              tier: nemesisTier.tier,
              newUBNCards: {
                ids: [],
                addRandom: nemesisTier.isNewTier,
              },
              treasure,
            },
          },
        }
      }, {}),
    },
  }
}

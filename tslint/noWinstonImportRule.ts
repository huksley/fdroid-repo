import * as Lint from 'tslint'
import * as ts from 'typescript'
import { NoImportWalker } from './NoImportWalker'

/**
 * Don`t use direct winston logger, use local logger instead
 * ```
 * import { logger as log } from './logger'
 * log.info("My information message")
 * ```
 */
export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "import from 'winston' is forbidden"

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new NoImportWalker(
        (s: string) => s === "'winston'",
        Rule.FAILURE_STRING,
        sourceFile,
        this.getOptions(),
      ),
    )
  }
}

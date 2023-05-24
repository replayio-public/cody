import { SourcegraphGraphQLAPIClient } from '../sourcegraph-api/graphql'

import { Guardrails, Attribution } from '.'

export class SourcegraphGuardrailsClient implements Guardrails {
    constructor(private client: SourcegraphGraphQLAPIClient) {}

    public async searchAttribution(snippet: string): Promise<Attribution | Error> {
        // TODO(keegancsmith) adjust implementation to respect line count thresholds
        const query = `type:file select:repo content:${goEscapeString(snippet)}`
        return this.client.searchTypeRepo(query)
    }
}

function goEscapeString(str: string): string {
    // TODO(keegancsmith) verify correct, this is blind copy pasta from cody
    let escaped = ''
    for (const c of str) {
        switch (c) {
            case '\n':
                escaped += '\\n'
                break
            case '\t':
                escaped += '\\t'
                break
            case '\r':
                escaped += '\\r'
                break
            case '\v':
                escaped += '\\v'
                break
            case '\b':
                escaped += '\\b'
                break
            case '\f':
                escaped += '\\f'
                break
            case '\\':
                escaped += '\\\\'
                break
            case '"':
                escaped += '\\"'
                break
            default:
                escaped += c
        }
    }
    return `"${escaped}"`
}
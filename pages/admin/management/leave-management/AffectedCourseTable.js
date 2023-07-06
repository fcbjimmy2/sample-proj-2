import * as React from 'react';

// project imports
import DataTable from '../../../../src/components/extended/DataTable_OLD';

// third-party
import { useIntl } from 'react-intl';

export default function AffectedCourseTable() {
    const intl = useIntl();

    // table header
    let headers = {};
    ['course-code'].forEach((header) => {
        headers[header] = intl.formatMessage({id: header});
    });

    return (
        <DataTable headers={headers} url="" title={intl.formatMessage({id: "affected-time-slots"})} args={{}} renderRow={() => {}} />
    );
}

// @ts-ignore
import { Tabs, Tab } from '@mui/material';
import { Can } from '@casl/react';
import { useNavigate } from 'react-router-dom';
import { usePermissionFetcher } from '../hooks/PermissionService';
import { useUriListForPermissions } from '../hooks/UriListForPermissions';
import { PermissionsToCheck } from '../interfaces';
import SpiffTooltip from './SpiffTooltip';

type OwnProps = {
  variant: string;
};

export default function ProcessInstanceListTabs({ variant }: OwnProps) {
  const navigate = useNavigate();
  const { targetUris } = useUriListForPermissions();
  const permissionRequestData: PermissionsToCheck = {
    [targetUris.processInstanceListPath]: ['GET'],
  };
  const { ability } = usePermissionFetcher(permissionRequestData);

  let selectedTabIndex = 0;
  if (variant === 'all') {
    selectedTabIndex = 1;
  } else if (variant === 'find-by-id') {
    selectedTabIndex = 2;
  }

  return (
    <Tabs value={selectedTabIndex} aria-label="List of tabs">
      <SpiffTooltip title="Only show process instances for the current user">
        <Tab
          label="For Me"
          data-qa="process-instance-list-for-me"
          onClick={() => {
            navigate('/process-instances/for-me');
          }}
        />
      </SpiffTooltip>
      <Can I="GET" a={targetUris.processInstanceListPath} ability={ability}>
        <SpiffTooltip title="Show process instances for all users">
          <Tab
            label="All"
            data-qa="process-instance-list-all"
            onClick={() => {
              navigate('/process-instances/all');
            }}
          />
        </SpiffTooltip>
      </Can>
      <SpiffTooltip title="Search for a process instance by id">
        <Tab
          label="Find By Id"
          data-qa="process-instance-list-find-by-id"
          onClick={() => {
            navigate('/process-instances/find-by-id');
          }}
        />
      </SpiffTooltip>
    </Tabs>
  );
}

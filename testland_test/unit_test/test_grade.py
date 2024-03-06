from grade import *
import pytest

@pytest.fixture
def get_probset():
    return '/mnt/e/desktop/problems/P1001'

@pytest.fixture
def get_code_path():
    return '/mnt/e/desktop/code/user1_P1001_trail1.py'


def test_read_config(get_probset):
    lines = read_config_file(get_probset)
    num_testcases, testcases, full_score = parse_config_file(lines)
    assert num_testcases == 10
    assert full_score == 100.0
    for i in range(10):
        input_file, output_file, score = testcases[i]
        assert input_file == f'{i+1}.in'
        assert output_file == f'{i+1}.ans'
        assert score == 10.0

def test_run_testcases(get_probset, get_code_path):
    lines = read_config_file(get_probset)
    num_testcases, testcases, full_score = parse_config_file(lines)
    results = run_testcases(get_probset, get_code_path, testcases)
    assert len(results) == 10
    for i in range(5):
        assert results[i]['result'] == 0
        assert results[i]['score'] == 10.0
    assert results[5]['result'] == 1
    assert results[5]['score'] == 0.0
    assert results[6]['result'] == 1
    assert results[6]['score'] == 0.0
    assert results[7]['result'] == 4
    assert results[7]['score'] == 0.0
    assert results[8]['result'] == 3
    assert results[8]['score'] == 0.0
    assert results[9]['result'] == 2
    assert results[9]['score'] == 0.0

def test_main(get_probset, get_code_path):
    with pytest.raises(SystemExit):
        main(['-p', get_probset, '-c', get_code_path])

def test_help(get_probset, get_code_path):
    with pytest.raises(SystemExit):
        main(['-h'])